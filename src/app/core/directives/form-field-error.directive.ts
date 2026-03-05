import { Directive, effect, inject, Input } from '@angular/core';
import {
  FieldTree,
  MaxLengthValidationError,
  MinLengthValidationError,
  ValidationError,
} from '@angular/forms/signals';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { LanguageService } from '../services/language.service';

type AppError =
  | ValidationError
  | MinLengthValidationError
  | MaxLengthValidationError;

@Directive({
  selector: '[formFieldError]',
})
export class FormFieldErrorDirective {
  @Input() formField!: FieldTree<string, any>;
  @Input() errorRef!: HTMLElement;

  private readonly languageService = inject(LanguageService);

  constructor() {
    effect(() => {
      if (!this.errorRef) return;

      const isTouched = this.formField().touched();
      const errors = this.formField().errors();

      if (errors?.length && isTouched) {
        this.errorRef.innerText = this.getErrorMessage(errors[0]);
      } else {
        this.errorRef.innerText = '';
      }
    });
  }

  private getErrorMessage(error: AppError): string {
    if (!error) return '';

    const key = error.kind as TranslatesEnum;

    if (error instanceof MinLengthValidationError) {
      return this.languageService.getTranslationWithParams(key, {
        length: error.minLength,
      })();
    }

    if (error instanceof MaxLengthValidationError) {
      return this.languageService.getTranslationWithParams(key, {
        length: error.maxLength,
      })();
    }

    return this.languageService.getTranslation(key)();
  }
}
