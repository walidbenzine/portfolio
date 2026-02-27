import { computed, Directive, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { TranslatesEnum } from '../../enums/translates.enum';

@Directive()
export abstract class BaseTranslationsComponent {
  protected readonly languageService = inject(LanguageService);

  protected readonly translations = computed(() =>
    this.languageService.getTranslationMap([...this.getTextsList()])(),
  );

  translatesEnum = TranslatesEnum;

  protected abstract getTextsList(): TranslatesEnum[];
}
