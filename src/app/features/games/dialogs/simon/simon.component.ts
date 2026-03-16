import { Component, computed } from '@angular/core';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import {
  SimonComponent as SimonLib,
  SimonTranslations,
  TilesEnum,
} from '@abenzine/simon';

@Component({
  selector: 'app-simon',
  template: `<simon
    [translations]="mappedTranslations()"
    successSoundPath="./sounds/simon/success.mp3"
    errorSoundPath="./sounds/simon/error.mp3"
    [tilesSoundPath]="tilesSoundPath"
  />`,
  styles: `
    :host {
      display: flex;
      width: 80dvw;
      max-height: 80dvh;
      color: var(--mat-app-text-color);
    }
  `,
  imports: [SimonLib],
})
export class SimonComponent extends BaseTranslationsComponent {
  tilesSoundPath = new Map<TilesEnum, string>([
    [TilesEnum.GREEN, './sounds/simon/sound1.mp3'],
    [TilesEnum.RED, './sounds/simon/sound2.mp3'],
    [TilesEnum.YELLOW, './sounds/simon/sound3.mp3'],
    [TilesEnum.BLUE, './sounds/simon/sound4.mp3'],
  ]);

  readonly mappedTranslations = computed(() =>
    this.mapTranslations(this.translations()),
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.SIMON,
      TranslatesEnum.SIMON_START_GAME,
      TranslatesEnum.SIMON_RESTART_GAME,
      TranslatesEnum.SIMON_PAUSE_GAME,
      TranslatesEnum.SIMON_RESUME_GAME,
      TranslatesEnum.SIMON_LEVEL,
      TranslatesEnum.SIMON_GAME_OVER,
      TranslatesEnum.SIMON_SOUND_ENABLED,
    ];
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): SimonTranslations {
    return {
      title: translations.get(TranslatesEnum.SIMON),
      startGame: translations.get(TranslatesEnum.SIMON_START_GAME),
      restartGame: translations.get(TranslatesEnum.SIMON_RESTART_GAME),
      pauseGame: translations.get(TranslatesEnum.SIMON_PAUSE_GAME),
      resumeGame: translations.get(TranslatesEnum.SIMON_RESUME_GAME),
      level: translations.get(TranslatesEnum.SIMON_LEVEL),
      gameOver: translations.get(TranslatesEnum.SIMON_GAME_OVER),
      soundEnabled: translations.get(TranslatesEnum.SIMON_SOUND_ENABLED),
    };
  }
}
