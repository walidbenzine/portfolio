import { Directive, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { GameEventsEnum } from '../../enums/game-events.enum';
import { ScenesEnum } from '../../enums/scenes.enum';
import { TranslatesEnum } from '../../enums/translates.enum';
import {
  emitGameEvent,
  onGameEvent,
  removeGameEventListener,
} from '../../helpers/game-event.helper';
import { XYInterface } from '../../interfaces/xy.interface';
import { BaseGameScene } from './base-game-scene';
import { BaseGameService } from './base-game.service';
import { GameSoundService } from '../../../core/services/game-sound.service';
import { OnInteractInterface } from '../../interfaces/on-interact.interface';
import { Router } from '@angular/router';
import { BaseTranslationsComponent } from './base-translations.component';
import { LoaderService } from '../../../core/services/loader.service';
import { GenericTextReplacementEnum } from '../../enums/generic-text-replacement.enum';

@Directive()
export abstract class BaseGameComponent
  extends BaseTranslationsComponent
  implements OnInit, OnDestroy
{
  private game!: Phaser.Game;
  private readonly gameService = inject(BaseGameService);
  private readonly loaderService = inject(LoaderService);
  private readonly gameSoundService = inject(GameSoundService);
  protected readonly router = inject(Router);

  protected abstract gameScene: typeof BaseGameScene;
  protected abstract scenesEnum: ScenesEnum;
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
    this.loaderService.show();
    this.initGameScene();
    this.subscribeToGameEvents();
  }

  private initGameScene(): void {
    this.game = new Phaser.Game(this.getGameConfig());

    this.game.events.once(Phaser.Core.Events.READY, () => {
      this.addSceneToGame();
      this.hideLoaderOnSceenCreated();
    });
  }

  private getGameConfig(): Phaser.Types.Core.GameConfig {
    return {
      type: Phaser.WEBGL,
      pixelArt: true,
      roundPixels: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true,
      },
      parent: this.gameContainer,
    };
  }

  private addSceneToGame(): void {
    this.game.scene.add(this.scenesEnum as string, this.gameScene, true, {
      previousPlayerPosition: this.gameService.getPlayerPosition(),
      textsMap: this.getTextsMap(this.translations()),
      isSoundPaused: !this.gameSoundService.isEnabled(),
    });
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

  private hideLoaderOnSceenCreated(): void {
    const scene = this.game.scene.getScene(this.scenesEnum);
    scene.events.once(Phaser.Scenes.Events.CREATE, () => {
      this.loaderService.hide();
    });
  }

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
