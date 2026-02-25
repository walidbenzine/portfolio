import { computed, Directive, inject, Signal } from '@angular/core';
import { TranslatesEnum } from '../enums/translates.enum';
import { LanguageService } from '../services/language.service';

@Directive()
export abstract class BaseTranslationsComponent {
  protected readonly languageService = inject(LanguageService);

  protected readonly translations = computed(() =>
    this.languageService.getTranslationMap([...this.getTextsList()])(),
  );

  translatesEnum = TranslatesEnum;

  protected abstract getTextsList(): TranslatesEnum[];
}
