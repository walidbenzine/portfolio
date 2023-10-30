import { Component } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  template: `
  <div class="gravityButton">
    <mat-icon *ngIf="isFrench; else english" class="clickable" (click)="changeLanguage()" fontSet="material-symbols-outlined">
      language_us
    </mat-icon>
  </div>
  <ng-template #english>
    <mat-icon class="clickable" (click)="changeLanguage()" fontSet="material-symbols-outlined">
      language_french
    </mat-icon>
  </ng-template>
  `,
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  isFrench: boolean = true;

  changeLanguage(): void {
    this.isFrench = !this.isFrench;
  }
}
