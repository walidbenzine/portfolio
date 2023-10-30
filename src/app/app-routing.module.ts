import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { ExpComponent } from './pages/exp/exp.component';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { RoutesEnum } from './shared/enums/routes.enum';

const routes: Routes = [
  { path: '', redirectTo: RoutesEnum.HOME, pathMatch: 'full' },
  { path: RoutesEnum.HOME, component: HomeComponent},
  { path: RoutesEnum.SKILLS, component: SkillsComponent},
  { path: RoutesEnum.EXPERIENCES, component: ExpComponent},
  { path: RoutesEnum.FORMATION, component: FormComponent},
  { path: RoutesEnum.CONTACT, component: ContactComponent},
  { path: '**', redirectTo: RoutesEnum.HOME },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
