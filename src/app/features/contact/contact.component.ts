import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  email,
  form,
  FormField,
  maxLength,
  minLength,
  required,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormFieldErrorDirective } from '../../core/directives/form-field-error.directive';
import { LoaderService } from '../../core/services/loader.service';
import { BaseTranslationsComponent } from '../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { ContactInterface } from '../../shared/interfaces/contact.interface';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormField,
    FormFieldErrorDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent extends BaseTranslationsComponent {
  private readonly loaderService = inject(LoaderService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly httpClient = inject(HttpClient);

  private readonly contactModel = signal<ContactInterface>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  contactForm = form(this.contactModel, (schemaPath) => {
    required(schemaPath.firstName);
    required(schemaPath.lastName);
    required(schemaPath.email);
    email(schemaPath.email);
    required(schemaPath.phone);
    minLength(schemaPath.phone, 10);
    maxLength(schemaPath.phone, 10);
    required(schemaPath.subject);
    minLength(schemaPath.subject, 5);
    required(schemaPath.message);
  });

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.FIRST_NAME,
      TranslatesEnum.LAST_NAME,
      TranslatesEnum.EMAIL_FIELD,
      TranslatesEnum.PHONE,
      TranslatesEnum.SUBJECT,
      TranslatesEnum.MESSAGE,
      TranslatesEnum.SUBMIT,
      TranslatesEnum.SUCCESS_CONTACT,
      TranslatesEnum.FAILED_CONTACT,
      TranslatesEnum.CLOSE,
    ];
  }

  submit(): void {
    this.loaderService.show();

    this.httpClient
      .post<{ success: boolean }>(
        environment.contactApi,
        this.contactForm().value(),
      )
      .pipe(
        tap((result) => this.handleResult(result.success)),
        catchError(() => of(this.showSnackBar(false))),
        finalize(() => this.loaderService.hide()),
      )
      .subscribe();
  }

  private handleResult(success: boolean): void {
    success && this.contactForm().reset();
    this.showSnackBar(success);
  }

  private showSnackBar(success: boolean): void {
    const message = success
      ? TranslatesEnum.SUCCESS_CONTACT
      : TranslatesEnum.FAILED_CONTACT;

    this.snackBar.open(
      `${this.translations().get(message)}`,
      `${this.translations().get(TranslatesEnum.CLOSE)}`,
      { panelClass: success ? 'successSnackBar' : 'errorSnackBar' },
    );
  }
}
