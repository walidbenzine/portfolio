import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-tmdb',
  templateUrl: './tmdb.component.html',
  imports: [DialogComponent, ChipsComponent],
})
export class TmdbComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.TMDB_LI1,
    TranslatesEnum.TMDB_LI2,
    TranslatesEnum.TMDB_LI3,
    TranslatesEnum.TMDB_LI4,
    TranslatesEnum.TMDB_LI5,
    TranslatesEnum.TMDB_LI6,
    TranslatesEnum.TMDB_LI7,
    TranslatesEnum.TMDB_LI8,
    TranslatesEnum.TMDB_LI9,
    TranslatesEnum.TMDB_LI10,
  ];

  readonly chips: TranslatesEnum[] = [
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.ANDROID,
    TranslatesEnum.MYSQL,
    TranslatesEnum.ANDROID_STUDIO,
    TranslatesEnum.API,
    TranslatesEnum.GIT,
    TranslatesEnum.JAVA,
    TranslatesEnum.KOTLIN,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.AUTH,
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.ADAPTABILITY,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.TMDB,
      TranslatesEnum.M2SSIO,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.TMDB_PARAGRAPH,
      ...this.bulletList,
    ];
  }
}
