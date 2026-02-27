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
      title: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE,
      ),
      startGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_START_GAME,
      ),
      restartGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_RESTART_GAME,
      ),
      pauseGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_PAUSE_GAME,
      ),
      resumeGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_RESUME_GAME,
      ),
      secretCodeLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_SECRET_CODE_LABEL,
      ),
      attemptsLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_LABEL,
      ),
      inputPlaceholder: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_INPUT_PLACEHOLDER,
      ),
      guessAlreadyTried: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_GUESS_ALREADY_TRIED,
      ),
      submitGuess: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_SUBMIT_GUESS,
      ),
      attemptsHistoryLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_HISTORY_LABEL,
      ),
      correctPlaceLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_CORRECT_PLACE_LABEL,
      ),
      wrongPlaceLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_WRONG_PLACE_LABEL,
      ),
      gameWonMessage: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.CRACK_THE_CODE_GAME_WON_MESSAGE,
      ),
    };
  }

  private getTranslationOrUndefined(
    translations: Map<TranslatesEnum, string>,
    key: TranslatesEnum,
  ): string | undefined {
    return translations.get(key) || undefined;
  }
}
