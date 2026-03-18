import { UpperCasePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { BaseTranslationsComponent } from '../../../shared/components/base/base-translations.component';
import { RoutesEnum } from '../../../shared/enums/routes.enum';
import { TranslatesEnum } from '../../../shared/enums/translates.enum';
import { GameSoundService } from '../../services/game-sound.service';
import { JoystickService } from '../../services/joystick.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { MenuService } from '../../services/menu.service';
import { AppTourService } from '../../services/app-tour.service';
import { NavigationService } from '../../services/navigation.service';

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
    NgClass,
  ],
})
export class MenuComponent
  extends BaseTranslationsComponent
  implements AfterViewInit
{
  @ViewChild('snav') sidenav!: MatSidenav;

  public readonly menuService = inject(MenuService);
  public readonly joystickService = inject(JoystickService);
  public readonly gameSoundService = inject(GameSoundService);
  public readonly navigationService = inject(NavigationService);
  private readonly appTourService = inject(AppTourService);
  private readonly router = inject(Router);

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

  ngAfterViewInit(): void {
    this.menuService.setSidenav(this.sidenav);
  }

  onClickRoute(route: RoutesEnum): void {
    if (!this.appTourService.isTourActive()) {
      this.router.navigate([route]);
    }
  }
}
