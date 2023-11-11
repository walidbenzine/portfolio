import { Injector, NgModule } from '@angular/core';
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
import { SkillsComponent } from './pages/skills/skills.component';
import { ExpComponent } from './pages/exp/exp.component';
import { FormComponent } from './pages/form/form.component';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LinksComponent } from './pages/home/links/links.component';
import { SidenavComponent } from './shared/components/navbar/sidenav/sidenav.component';
import { ViverisComponent } from './pages/exp/viveris/viveris.component';
import { CapComponent } from './pages/exp/cap/cap.component';
import { FreeComponent } from './pages/exp/free/free.component';
import { TelecomComponent } from './pages/exp/telecom/telecom.component';
import { CardItemComponent } from './shared/components/card-item/card-item.component';
import { CarouselComponent } from './shared/components/caroussel/caroussel.component';
import { CarouselItemDirective } from './shared/directives/carrousel-item.directive';
import { CarouselItemElement } from './shared/directives/caroussel-item-element.directive';
import { UpemComponent } from './pages/form/upem/upem.component';
import { UboComponent } from './pages/form/ubo/ubo.component';
import { UsthbComponent } from './pages/form/usthb/usthb.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeControllerComponent,
    NavbarComponent,
    NavItemComponent,
    HomeComponent,
    SkillsComponent,
    ExpComponent,
    FormComponent,
    LanguageSelectorComponent,
    LinksComponent,
    SidenavComponent,
    ViverisComponent,
    CapComponent,
    FreeComponent,
    TelecomComponent,
    CardItemComponent,
    CarouselComponent,
    CarouselItemElement,
    CarouselItemDirective,
    UpemComponent,
    UboComponent,
    UsthbComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}

export let AppInjector: Injector;

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
