import {
  Directive,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  NgControl,
  StatusChangeEvent,
  TouchedChangeEvent,
  ValidationErrors,
} from '@angular/forms';
import { combineLatestWith, filter, Observable, Subscription, tap } from 'rxjs';
import { TranslatesEnum } from '../enums/translates.enum';
import { LanguageService } from '../services/language.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { LanguagesEnum } from '../enums/languages.enum';

@Directive({
  selector: '[matInput]',
})
export class InputErrorDirective implements OnInit, OnDestroy {
  private readonly ngControl = inject(NgControl);
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly languageService = inject(LanguageService);

  private subscription?: Subscription;
  private languageObs?: Observable<LanguagesEnum>;
  private matErrorElement?: HTMLElement;

  constructor() {
    this.languageObs = toObservable(this.languageService.getLanguage);
  }

  ngOnInit(): void {
    const matFormField = this.el.nativeElement.closest('mat-form-field');
    if (!matFormField || !this.ngControl?.control) return;

    this.matErrorElement = this.renderer.createElement('mat-error');
    this.renderer.appendChild(matFormField, this.matErrorElement);

    this.subscription = this.ngControl
      .control!.events.pipe(
        combineLatestWith(this.languageObs!),
        filter(
          ([event, _]) =>
            event instanceof TouchedChangeEvent ||
            event instanceof StatusChangeEvent,
        ),
        tap(() => this.updateError()),
      )
      .subscribe();
  }

  private updateError(): void {
    const control = this.ngControl.control;
    if (!control || !this.matErrorElement) return;

    const showError = control.invalid && (control.touched || control.dirty);

    if (showError) {
      const message = this.getErrorMessage(control.errors);
      this.renderer.setProperty(this.matErrorElement, 'innerText', message);
      this.renderer.addClass(this.matErrorElement, 'input-error');
    } else {
      this.renderer.setProperty(this.matErrorElement, 'innerText', '');
      this.renderer.removeClass(this.matErrorElement, 'input-error');
    }
  }

  private getErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) return '';
    const firstKey = this.getFirstErrorKey(errors);

    if (firstKey === TranslatesEnum.MIN_LENGTH && errors['minlength']) {
      const length = errors['minlength'].requiredLength;
      return this.languageService.getTranslationWithParams(
        firstKey as TranslatesEnum,
        { length },
      )();
    }

    if (firstKey === TranslatesEnum.MAX_LENGTH && errors['maxlength']) {
      const length = errors['maxlength'].requiredLength;
      return this.languageService.getTranslationWithParams(
        firstKey as TranslatesEnum,
        { length },
      )();
    }
    return this.languageService.getTranslation(firstKey)();
  }

  private getFirstErrorKey(errors: ValidationErrors): TranslatesEnum {
    const [firstKey] = Object.keys(errors);
    const isKeyHaveTranslate = Object.values(TranslatesEnum).some(
      (v) => v === firstKey,
    );
    return isKeyHaveTranslate
      ? (firstKey as TranslatesEnum)
      : TranslatesEnum.INVALID_FIELD;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
