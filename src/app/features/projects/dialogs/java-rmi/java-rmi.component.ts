import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-java-rmi',
  templateUrl: './java-rmi.component.html',
  imports: [DialogComponent, ChipsComponent],
})
export class JavaRmiComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.JAVA_RMI_LI1,
    TranslatesEnum.JAVA_RMI_LI2,
    TranslatesEnum.JAVA_RMI_LI3,
    TranslatesEnum.JAVA_RMI_LI4,
    TranslatesEnum.JAVA_RMI_LI5,
    TranslatesEnum.JAVA_RMI_LI6,
    TranslatesEnum.JAVA_RMI_LI7,
    TranslatesEnum.JAVA_RMI_LI8,
    TranslatesEnum.JAVA_RMI_LI9,
    TranslatesEnum.JAVA_RMI_LI10,
  ];

  readonly chips: TranslatesEnum[] = [
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.API,
    TranslatesEnum.GIT,
    TranslatesEnum.MYSQL,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.HTML,
    TranslatesEnum.JAVA,
    TranslatesEnum.JAVA_EE,
    TranslatesEnum.NETWORK_SECURITY,
    TranslatesEnum.JAVASCRIPT,
    TranslatesEnum.CSS,
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.ADAPTABILITY,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.JAVA_RMI,
      TranslatesEnum.M2SSIO,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.JAVA_RMI_PARAGRAPH,
      ...this.bulletList,
    ];
  }
}
