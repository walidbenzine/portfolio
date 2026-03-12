import { Component, computed } from '@angular/core';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import {
  MemoryComponent as MemoryLib,
  MemoryTranslations,
} from '@abenzine/memory';

@Component({
  selector: 'app-memory',
  template: `<memory
    [translations]="mappedTranslations()"
    [hiddenNumbers]="10"
  />`,
  styles: `
    :host {
      display: flex;
      width: 80dvw;
      max-height: 80dvh;
      color: var(--mat-app-text-color);
    }
  `,
  imports: [MemoryLib],
})
export class MemoryComponent extends BaseTranslationsComponent {
  readonly mappedTranslations = computed(() =>
    this.mapTranslations(this.translations()),
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.MEMORY_TITLE,
      TranslatesEnum.MEMORY_START_GAME,
      TranslatesEnum.MEMORY_RESTART_GAME,
      TranslatesEnum.MEMORY_PAUSE_GAME,
      TranslatesEnum.MEMORY_RESUME_GAME,
      TranslatesEnum.MEMORY_ATTEMPTS_LABEL,
      TranslatesEnum.MEMORY_GAME_WON_MESSAGE,
    ];
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): MemoryTranslations {
    return {
      title: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_TITLE,
      ),
      startGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_START_GAME,
      ),
      restartGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_RESTART_GAME,
      ),
      pauseGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_PAUSE_GAME,
      ),
      resumeGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_RESUME_GAME,
      ),
      attemptsLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_ATTEMPTS_LABEL,
      ),
      gameWonMessage: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_GAME_WON_MESSAGE,
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
