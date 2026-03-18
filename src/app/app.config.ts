import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LanguagesEnum } from './shared/enums/languages.enum';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { LanguageService } from './core/services/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withHashLocation()),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './i18n/' }),
      fallbackLang: LanguagesEnum.FR,
      lang: LanguagesEnum.FR,
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const languageService = inject(LanguageService);
      return translate.use(languageService.getLanguage());
    }),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 },
    },
  ],
};
