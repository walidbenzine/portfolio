import {
  Directive,
  effect,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GameEventsEnum } from '../enums/game-events.enum';
import { ScenesEnum } from '../enums/scenes.enum';
import { TranslatesEnum } from '../enums/translates.enum';
import {
  emitGameEvent,
  onGameEvent,
  removeGameEventListener,
} from '../helpers/game-event.helper';
import { XYInterface } from '../interfaces/xy.interface';
import { BaseGameScene } from './base-game-scene';
import { BaseGameService } from './base-game.service';
import { GameSoundService } from '../services/game-sound.service';
import { OnInteractInterface } from '../interfaces/on-interact.interface';
import { Router } from '@angular/router';
import { GenericTextReplacementEnum } from '../enums/generic-text-replacement.enum';
import { BaseTranslationsComponent } from './base-translations.component';

@Directive()
export abstract class BaseGameComponent
  extends BaseTranslationsComponent
  implements OnInit, OnDestroy
{
  private game!: Phaser.Game;
  private readonly gameService = inject(BaseGameService);
  private readonly gameSoundService = inject(GameSoundService);
  protected readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

  protected abstract gameScene: BaseGameScene;
  protected abstract scenesEnum: ScenesEnum;
  protected abstract readonly mapWidth: number;
  protected abstract readonly mapHeight: number;
  protected abstract readonly gameContainer: string;

  constructor() {
    super();
    effect(() => {
      const textsMap = this.getTextsMap(this.translations());
      this.emitLanguageChangedEvent(textsMap);
    });
  }

  private getTextsMap(
    translations: Map<TranslatesEnum, string>,
  ): Map<string, string> {
    const textsMap = new Map<string, string>();
    translations.forEach((value, key) => {
      const remplacementKey = this.getTextsRemplacements().get(key);
      textsMap.set(remplacementKey ?? key, value);
    });
    return textsMap;
  }

  protected getTextsList(): TranslatesEnum[] {
    return [TranslatesEnum.INTERACTION_HINT];
  }

  protected abstract getTextsRemplacements(): Map<
    TranslatesEnum,
    GenericTextReplacementEnum
  >;

  private emitLanguageChangedEvent(textMap: Map<string, string>): void {
    emitGameEvent<GameEventsEnum.LANGUAGE_CHANGED>(
      GameEventsEnum.LANGUAGE_CHANGED,
      { texts: textMap },
    );
  }

  ngOnInit(): void {
    this.initGameScene();
    this.subscribeToGameEvents();
  }

  private initGameScene(): void {
    this.ngZone.runOutsideAngular(() => {
      this.game = new Phaser.Game(this.getGameConfig());

      this.game.scene.add(this.scenesEnum, this.gameScene, true, {
        previousPlayerPosition: this.gameService.getPlayerPosition(),
        textsMap: this.getTextsMap(this.translations()),
        isSoundPaused: !this.gameSoundService.isEnabled(),
      });
    });
  }

  private getGameConfig(): Phaser.Types.Core.GameConfig {
    return {
      type: Phaser.AUTO,
      width: this.mapWidth,
      height: this.mapHeight,
      render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: this.getScaleWidth(),
        height: this.getScaleHeight(),
      },
      parent: this.gameContainer,
    };
  }

  protected getScaleWidth(): number {
    return Math.min(
      window.innerWidth * this.getScaleWidthCoefficient(),
      this.mapWidth,
    );
  }

  protected getScaleHeight(): number {
    return Math.min(
      window.innerHeight * this.getScaleHeightCoefficient(),
      this.mapHeight,
    );
  }

  protected getScaleWidthCoefficient(): number {
    return this.getScaleCoefficient();
  }

  protected getScaleHeightCoefficient(): number {
    return this.getScaleCoefficient();
  }

  protected getScaleCoefficient(): number {
    return 1.5;
  }

  private subscribeToGameEvents(): void {
    onGameEvent(
      GameEventsEnum.SAVE_PLAYER_POSITION,
      this.playerPositionHandler,
    );

    onGameEvent(GameEventsEnum.ON_INTERACT, this.interactionsHandler);
  }

  private playerPositionHandler = (e: CustomEvent<XYInterface>) => {
    this.gameService.setPlayerPosition(e.detail.x, e.detail.y);
  };

  protected interactionsHandler = (e: CustomEvent<OnInteractInterface>) => {
    e.detail.route && this.router.navigate([e.detail.route]);
  };

  ngOnDestroy(): void {
    this.game?.destroy(true);
    removeGameEventListener(
      GameEventsEnum.SAVE_PLAYER_POSITION,
      this.playerPositionHandler,
    );
    removeGameEventListener(
      GameEventsEnum.ON_INTERACT,
      this.interactionsHandler,
    );
  }
}
