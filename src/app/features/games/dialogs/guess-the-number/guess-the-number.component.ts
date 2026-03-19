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
      TranslatesEnum.GUESS_THE_NUMBER_INSTRUCTIONS,
    ];
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): GuessTheNumberTranslations {
    return {
      title: translations.get(TranslatesEnum.GUESS_THE_NUMBER),
      startGame: translations.get(TranslatesEnum.GUESS_THE_NUMBER_START_GAME),
      restartGame: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_RESTART_GAME,
      ),
      pauseGame: translations.get(TranslatesEnum.GUESS_THE_NUMBER_PAUSE_GAME),
      resumeGame: translations.get(TranslatesEnum.GUESS_THE_NUMBER_RESUME_GAME),
      secretCodeLabel: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_SECRET_CODE_LABEL,
      ),
      attemptsLabel: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_LABEL,
      ),
      inputPlaceholder: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_INPUT_PLACEHOLDER,
      ),
      guessAlreadyTried: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_GUESS_ALREADY_TRIED,
      ),
      submitGuess: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_SUBMIT_GUESS,
      ),
      attemptsHistoryLabel: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_HISTORY_LABEL,
      ),
      isEqual: translations.get(TranslatesEnum.GUESS_THE_NUMBER_IS_EQUAL_LABEL),
      isLess: translations.get(TranslatesEnum.GUESS_THE_NUMBER_IS_LESS_LABEL),
      isGreater: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_IS_GREATER_LABEL,
      ),
      gameWonMessage: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_GAME_WON_MESSAGE,
      ),
      instructions: translations.get(
        TranslatesEnum.GUESS_THE_NUMBER_INSTRUCTIONS,
      ),
    };
  }
}
