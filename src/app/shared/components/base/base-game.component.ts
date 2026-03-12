import { Directive, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameSoundService } from '../../../core/services/game-sound.service';
import { GameEventsEnum } from '../../enums/game-events.enum';
import { GenericTextReplacementEnum } from '../../enums/generic-text-replacement.enum';
import { ScenesEnum } from '../../enums/scenes.enum';
import { TranslatesEnum } from '../../enums/translates.enum';
import {
  emitGameEvent,
  onGameEvent,
  removeGameEventListener,
} from '../../helpers/game-event.helper';
import { GameRouteConfigInterface } from '../../interfaces/game-route-config.interface';
import { OnInteractInterface } from '../../interfaces/on-interact.interface';
import { XYInterface } from '../../interfaces/xy.interface';
import { PhaserGameManagerService } from '../../../core/services/phaser-game-manager.service';
import { BaseGameScene } from './base-game-scene';
import { BaseGameService } from './base-game.service';
import { BaseTranslationsComponent } from './base-translations.component';

@Directive()
export abstract class BaseGameComponent
  extends BaseTranslationsComponent
  implements OnInit, OnDestroy
{
  private readonly gameService = inject(BaseGameService);
  private readonly gameSoundService = inject(GameSoundService);
  private readonly phaserGameManager = inject(PhaserGameManagerService);
  protected readonly router = inject(Router);

  protected abstract gameScene: typeof BaseGameScene;
  protected abstract scenesEnum: ScenesEnum;

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
    this.phaserGameManager.activateScene(
      this.getRouteConfig(),
      this.getSceneInitData(),
    );
  }

  private getSceneInitData() {
    return {
      previousPlayerPosition: this.gameService.getPlayerPosition(),
      textsMap: this.getTextsMap(this.translations()),
      isSoundPaused: !this.gameSoundService.isEnabled(),
    };
  }

  private getRouteConfig(): GameRouteConfigInterface {
    return {
      sceneKey: this.scenesEnum,
      sceneClass: this.gameScene,
    };
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
    this.phaserGameManager.deactivateScene(this.scenesEnum as string);
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
