import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { BaseTranslationsComponent } from '../../base/base-translations.component';
import { RoutesEnum } from '../../enums/routes.enum';
import { TranslatesEnum } from '../../enums/translates.enum';
import { GameSoundService } from '../../services/game-sound.service';
import { JoystickService } from '../../services/joystick.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ThemeSelectorComponent,
    LanguageSelectorComponent,
    UpperCasePipe,
    RouterModule,
  ],
})
export class MenuComponent extends BaseTranslationsComponent {
  public readonly joystickService = inject(JoystickService);
  public readonly gameSoundService = inject(GameSoundService);

  routes = [
    { route: RoutesEnum.HOME, label: TranslatesEnum.HOME },
    { route: RoutesEnum.FORMS, label: TranslatesEnum.FORMS },
    { route: RoutesEnum.EXPERIENCES, label: TranslatesEnum.EXPERIENCES },
    { route: RoutesEnum.PROJECTS, label: TranslatesEnum.PROJECTS },
    { route: RoutesEnum.GAMES, label: TranslatesEnum.GAMES },
    { route: RoutesEnum.CONTACT, label: TranslatesEnum.CONTACT },
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.SHOW_JOYSTICK,
      TranslatesEnum.GAME_SOUND,
      TranslatesEnum.CONTACT,
      TranslatesEnum.EXPERIENCES,
      TranslatesEnum.FORMS,
      TranslatesEnum.PROJECTS,
      TranslatesEnum.GAMES,
      TranslatesEnum.HOME,
      TranslatesEnum.ROUTES,
      TranslatesEnum.PARAMS,
      TranslatesEnum.NETWORKS,
    ];
  }
}
