import { Component } from '@angular/core';

@Component({
  selector: 'theme-controller',
  template: `
    <div class="gravityButton">
      <mat-icon *ngIf="isLightMode; else lightMode" class="clickable" (click)="changeMode()">dark_mode</mat-icon>
    </div>
    <ng-template #lightMode>
      <mat-icon class="clickable" (click)="changeMode()">light_mode</mat-icon>
    </ng-template>
  `,
})
export class ThemeControllerComponent {

  isLightMode: boolean = true;

  changeMode() {
    this.isLightMode = !this.isLightMode;
    document.body.classList.toggle("dark-mode")
  }
}
