import { Routes } from '@angular/router';
import { RoutesEnum } from './enums/routes.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.HOME,
    pathMatch: 'full',
  },
  {
    path: RoutesEnum.HOME,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: RoutesEnum.CONTACT,
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: RoutesEnum.EXPERIENCES,
    loadComponent: () =>
      import('./pages/experiences/experiences.component').then(
        (m) => m.ExperiencesComponent,
      ),
  },
  {
    path: RoutesEnum.FORMS,
    loadComponent: () =>
      import('./pages/forms/forms.component').then((m) => m.FormsComponent),
  },
  {
    path: RoutesEnum.GAMES,
    loadComponent: () =>
      import('./pages/games/games.component').then((m) => m.GamesComponent),
  },
  {
    path: RoutesEnum.PROJECTS,
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
  },
];
