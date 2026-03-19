import { Component, computed, OnInit } from '@angular/core';
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
    [hiddenNumbers]="6"
    [cardWidth]="cardWidth"
  />`,
  imports: [MemoryLib],
})
export class MemoryComponent
  extends BaseTranslationsComponent
  implements OnInit
{
  cardWidth: string | undefined = undefined;

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
      TranslatesEnum.MEMORY_INSTRUCTIONS,
    ];
  }

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.cardWidth = '40px';
    }
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): MemoryTranslations {
    return {
      title: translations.get(TranslatesEnum.MEMORY_TITLE),
      startGame: translations.get(TranslatesEnum.MEMORY_START_GAME),
      restartGame: translations.get(TranslatesEnum.MEMORY_RESTART_GAME),
      pauseGame: translations.get(TranslatesEnum.MEMORY_PAUSE_GAME),
      resumeGame: translations.get(TranslatesEnum.MEMORY_RESUME_GAME),
      attemptsLabel: translations.get(TranslatesEnum.MEMORY_ATTEMPTS_LABEL),
      gameWonMessage: translations.get(TranslatesEnum.MEMORY_GAME_WON_MESSAGE),
      instructions: translations.get(TranslatesEnum.MEMORY_INSTRUCTIONS),
    };
  }
}
