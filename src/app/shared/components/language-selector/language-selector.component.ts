import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  template: `
  <div class="gravityButton" (click)="changeLanguage()">
    <mat-icon *ngIf="isFrench; else english" class="clickable" fontSet="material-symbols-outlined">
    <div class="fi fi-us flag"></div>
      language_us
    </mat-icon>
  </div>
  <ng-template #english>
    <mat-icon class="clickable" fontSet="material-symbols-outlined">
      <div class="fi fi-fr flag"></div>
      language_french
    </mat-icon>
  </ng-template>
  `,
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  isFrench: boolean = true;

  constructor(
    private translate: TranslateService,
  ) { }

  changeLanguage(): void {
    this.isFrench = !this.isFrench;
    this.isFrench ? this.translate.use('fr') : this.translate.use('en');
  }
}
