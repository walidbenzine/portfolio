import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContactInterface } from '../../shared/interfaces/contact.interface';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { InputErrorDirective } from '../../core/directives/input-error.directive';
import { BaseTranslationsComponent } from '../../shared/components/base/base-translations.component';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputErrorDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent
  extends BaseTranslationsComponent
  implements OnInit
{
  private readonly fb = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.createContactForm();
  }

  private createContactForm(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      subject: [null, [Validators.required, Validators.minLength(5)]],
      message: [null, Validators.required],
    });
  }

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.FIRST_NAME,
      TranslatesEnum.LAST_NAME,
      TranslatesEnum.EMAIL_FIELD,
      TranslatesEnum.PHONE,
      TranslatesEnum.SUBJECT,
      TranslatesEnum.MESSAGE,
      TranslatesEnum.SUBMIT,
    ];
  }

  submit(): void {
    console.log(this.form.value as ContactInterface);
  }
}
