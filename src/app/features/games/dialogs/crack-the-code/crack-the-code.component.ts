import { Component, computed } from '@angular/core';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import {
  CrackTheCodeComponent as CrackTheCodeLib,
  CrackTheCodeTranslations,
} from '@abenzine/crack-the-code';

@Component({
  selector: 'app-crack-the-code',
  template: `<crack-the-code [translations]="mappedTranslations()" />`,
  styles: `
    :host {
      display: flex;
      width: 80dvw;
      max-height: 80dvh;
      color: var(--mat-app-text-color);
    }
  `,
  imports: [CrackTheCodeLib],
})
export class CrackTheCodeComponent extends BaseTranslationsComponent {
  readonly mappedTranslations = computed(() =>
    this.mapTranslations(this.translations()),
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.CRACK_THE_CODE,
      TranslatesEnum.CRACK_THE_CODE_START_GAME,
      TranslatesEnum.CRACK_THE_CODE_RESTART_GAME,
      TranslatesEnum.CRACK_THE_CODE_PAUSE_GAME,
      TranslatesEnum.CRACK_THE_CODE_RESUME_GAME,
      TranslatesEnum.CRACK_THE_CODE_SECRET_CODE_LABEL,
      TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_LABEL,
      TranslatesEnum.CRACK_THE_CODE_INPUT_PLACEHOLDER,
      TranslatesEnum.CRACK_THE_CODE_GUESS_ALREADY_TRIED,
      TranslatesEnum.CRACK_THE_CODE_SUBMIT_GUESS,
      TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_HISTORY_LABEL,
      TranslatesEnum.CRACK_THE_CODE_CORRECT_PLACE_LABEL,
      TranslatesEnum.CRACK_THE_CODE_WRONG_PLACE_LABEL,
      TranslatesEnum.CRACK_THE_CODE_GAME_WON_MESSAGE,
    ];
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): CrackTheCodeTranslations {
    return {
      title: translations.get(TranslatesEnum.CRACK_THE_CODE),
      startGame: translations.get(TranslatesEnum.CRACK_THE_CODE_START_GAME),
      restartGame: translations.get(TranslatesEnum.CRACK_THE_CODE_RESTART_GAME),
      pauseGame: translations.get(TranslatesEnum.CRACK_THE_CODE_PAUSE_GAME),
      resumeGame: translations.get(TranslatesEnum.CRACK_THE_CODE_RESUME_GAME),
      secretCodeLabel: translations.get(
        TranslatesEnum.CRACK_THE_CODE_SECRET_CODE_LABEL,
      ),
      attemptsLabel: translations.get(
        TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_LABEL,
      ),
      inputPlaceholder: translations.get(
        TranslatesEnum.CRACK_THE_CODE_INPUT_PLACEHOLDER,
      ),
      guessAlreadyTried: translations.get(
        TranslatesEnum.CRACK_THE_CODE_GUESS_ALREADY_TRIED,
      ),
      submitGuess: translations.get(TranslatesEnum.CRACK_THE_CODE_SUBMIT_GUESS),
      attemptsHistoryLabel: translations.get(
        TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_HISTORY_LABEL,
      ),
      correctPlaceLabel: translations.get(
        TranslatesEnum.CRACK_THE_CODE_CORRECT_PLACE_LABEL,
      ),
      wrongPlaceLabel: translations.get(
        TranslatesEnum.CRACK_THE_CODE_WRONG_PLACE_LABEL,
      ),
      gameWonMessage: translations.get(
        TranslatesEnum.CRACK_THE_CODE_GAME_WON_MESSAGE,
      ),
    };
  }
}
