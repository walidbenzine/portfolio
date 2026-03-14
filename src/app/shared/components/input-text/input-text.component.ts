import { Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormFieldErrorDirective } from '../../../core/directives/form-field-error.directive';
import { TranslatesEnum } from '../../enums/translates.enum';
import { BaseTranslationsComponent } from '../base/base-translations.component';
import { InputTypes } from '../../types/app-types';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [
    FormField,
    MatFormFieldModule,
    MatInputModule,
    FormFieldErrorDirective,
  ],
})
export class InputTextComponent extends BaseTranslationsComponent {
  readonly label = input.required<TranslatesEnum>();
  readonly control = input.required<FieldTree<string, string>>();
  readonly type = input<InputTypes>('text');

  protected override getTextsList(): TranslatesEnum[] {
    return [this.label()];
  }
}
