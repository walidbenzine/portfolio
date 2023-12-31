import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpComponent } from './pages/exp/exp.component';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RoutesEnum } from './shared/enums/routes.enum';

const routes: Routes = [
  { path: '', redirectTo: RoutesEnum.HOME, pathMatch: 'full' },
  { path: RoutesEnum.HOME, component: HomeComponent},
  { path: RoutesEnum.PROJECTS, component: ProjectsComponent},
  { path: RoutesEnum.EXPERIENCES, component: ExpComponent},
  { path: RoutesEnum.FORMATIONS, component: FormComponent},
  { path: '**', redirectTo: RoutesEnum.HOME },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
