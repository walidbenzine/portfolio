import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-easy-path',
  templateUrl: './easy-path.component.html',
  imports: [DialogComponent, ChipsComponent],
})
export class EasyPathComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.EASY_PATH_LI1,
    TranslatesEnum.EASY_PATH_LI2,
    TranslatesEnum.EASY_PATH_LI3,
    TranslatesEnum.EASY_PATH_LI4,
    TranslatesEnum.EASY_PATH_LI5,
    TranslatesEnum.EASY_PATH_LI6,
    TranslatesEnum.EASY_PATH_LI7,
    TranslatesEnum.EASY_PATH_LI8,
    TranslatesEnum.EASY_PATH_LI9,
    TranslatesEnum.EASY_PATH_LI10,
  ];

  readonly chips: TranslatesEnum[] = [
    TranslatesEnum.IOT,
    TranslatesEnum.IA,
    TranslatesEnum.NETWORK_DESIGN,
    TranslatesEnum.NETWORK_SECURITY,
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.RASPBERRY,
    TranslatesEnum.ANDROID,
    TranslatesEnum.MONGO_DB,
    TranslatesEnum.ANDROID_STUDIO,
    TranslatesEnum.API,
    TranslatesEnum.GIT,
    TranslatesEnum.SCIKIT_LEARN,
    TranslatesEnum.PYTHON,
    TranslatesEnum.JAVA,
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.ADAPTABILITY,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.EASY_PATH,
      TranslatesEnum.M2SSIO,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.EASY_PATH_PARAGRAPH,
      ...this.bulletList,
    ];
  }
}
