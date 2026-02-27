import { Routes } from '@angular/router';
import { RoutesEnum } from './shared/enums/routes.enum';

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
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: RoutesEnum.EXPERIENCES,
    loadComponent: () =>
      import('./features/experiences/experiences.component').then(
        (m) => m.ExperiencesComponent,
      ),
  },
  {
    path: RoutesEnum.FORMS,
    loadComponent: () =>
      import('./features/forms/forms.component').then((m) => m.FormsComponent),
  },
  {
    path: RoutesEnum.GAMES,
    loadComponent: () =>
      import('./features/games/games.component').then((m) => m.GamesComponent),
  },
  {
    path: RoutesEnum.PROJECTS,
    loadComponent: () =>
      import('./features/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
  },
];
