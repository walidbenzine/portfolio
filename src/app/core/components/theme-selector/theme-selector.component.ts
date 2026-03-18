import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { TranslatesEnum } from '../../../shared/enums/translates.enum';
import { LanguageService } from '../../services/language.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-theme-selector',
  template: `
    <mat-icon (click)="themeService.toggle()" [matTooltip]="translation()">
      {{ themeService.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}
    </mat-icon>
  `,
  styles: `
    :host {
      display: flex;
    }
    mat-icon {
      cursor: pointer;
      font-size: 50px;
      width: 50px;
      height: auto;

      @media (max-height: 900px) {
        font-size: 30px;
        width: 30px;
      }
    }
  `,
  imports: [MatIcon, MatTooltip],
  providers: [ThemeService],
})
export class ThemeSelectorComponent {
  private readonly languageService = inject(LanguageService);
  public readonly themeService = inject(ThemeService);

  readonly translation = this.languageService.getTranslation(
    TranslatesEnum.CHANGE_THEME,
  );
}
