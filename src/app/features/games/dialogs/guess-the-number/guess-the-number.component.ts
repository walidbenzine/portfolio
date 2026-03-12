import { Component, computed } from '@angular/core';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import {
  GuessTheNumberComponent as GuessTheNumberLib,
  GuessTheNumberTranslations,
} from '@abenzine/guess-the-number';

@Component({
  selector: 'app-guess-the-number',
  template: `<guess-the-number [translations]="mappedTranslations()" />`,
  styles: `
    :host {
      display: flex;
      width: 80dvw;
      max-height: 80dvh;
      color: var(--mat-app-text-color);
    }
  `,
  imports: [GuessTheNumberLib],
})
export class GuessTheNumberComponent extends BaseTranslationsComponent {
  readonly mappedTranslations = computed(() =>
    this.mapTranslations(this.translations()),
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.GUESS_THE_NUMBER,
      TranslatesEnum.GUESS_THE_NUMBER_START_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_RESTART_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_PAUSE_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_RESUME_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_SECRET_CODE_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_INPUT_PLACEHOLDER,
      TranslatesEnum.GUESS_THE_NUMBER_GUESS_ALREADY_TRIED,
      TranslatesEnum.GUESS_THE_NUMBER_SUBMIT_GUESS,
      TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_HISTORY_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_IS_EQUAL_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_IS_GREATER_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_IS_LESS_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_GAME_WON_MESSAGE,
    ];
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): GuessTheNumberTranslations {
    return {
      title: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER,
      ),
      startGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_START_GAME,
      ),
      restartGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_RESTART_GAME,
      ),
      pauseGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_PAUSE_GAME,
      ),
      resumeGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_RESUME_GAME,
      ),
      secretCodeLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_SECRET_CODE_LABEL,
      ),
      attemptsLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_LABEL,
      ),
      inputPlaceholder: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_INPUT_PLACEHOLDER,
      ),
      guessAlreadyTried: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_GUESS_ALREADY_TRIED,
      ),
      submitGuess: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_SUBMIT_GUESS,
      ),
      attemptsHistoryLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_HISTORY_LABEL,
      ),
      isEqual: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_IS_EQUAL_LABEL,
      ),
      isLess: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_IS_LESS_LABEL,
      ),
      isGreater: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_IS_GREATER_LABEL,
      ),
      gameWonMessage: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.GUESS_THE_NUMBER_GAME_WON_MESSAGE,
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
