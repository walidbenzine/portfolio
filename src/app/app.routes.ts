import { Routes } from '@angular/router';
import { RoutesEnum } from './shared/enums/routes.enum';
import { internalNavigationGuard } from './core/guards/internal-navigation.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.HOME,
    pathMatch: 'full',
  },
  {
    path: RoutesEnum.HOME,
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: RoutesEnum.CONTACT,
    canActivate: [internalNavigationGuard],
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: RoutesEnum.EXPERIENCES,
    canActivate: [internalNavigationGuard],
    loadComponent: () =>
      import('./features/experiences/experiences.component').then(
        (m) => m.ExperiencesComponent,
      ),
  },
  {
    path: RoutesEnum.FORMS,
    canActivate: [internalNavigationGuard],
    loadComponent: () =>
      import('./features/forms/forms.component').then((m) => m.FormsComponent),
  },
  {
    path: RoutesEnum.GAMES,
    canActivate: [internalNavigationGuard],
    loadComponent: () =>
      import('./features/games/games.component').then((m) => m.GamesComponent),
  },
  {
    path: RoutesEnum.PROJECTS,
    canActivate: [internalNavigationGuard],
    loadComponent: () =>
      import('./features/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
  },
  {
    path: '**',
    redirectTo: RoutesEnum.HOME,
  },
];
