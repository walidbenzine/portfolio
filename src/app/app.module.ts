import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ThemeControllerComponent } from './shared/components/theme-controller/theme-controller.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NavItemComponent } from './shared/components/nav-item/nav-item.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ExpComponent } from './pages/exp/exp.component';
import { FormComponent } from './pages/form/form.component';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeControllerComponent,
    NavbarComponent,
    NavItemComponent,
    HomeComponent,
    ContactComponent,
    SkillsComponent,
    ExpComponent,
    FormComponent,
    LanguageSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
