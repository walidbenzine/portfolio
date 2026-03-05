import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-voisin-malin',
  templateUrl: './voisin-malin.component.html',
  imports: [DialogComponent, ChipsComponent],
})
export class VoisinMalinComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.VOISIN_MALIN_LI1,
    TranslatesEnum.VOISIN_MALIN_LI2,
    TranslatesEnum.VOISIN_MALIN_LI3,
    TranslatesEnum.VOISIN_MALIN_LI4,
    TranslatesEnum.VOISIN_MALIN_LI5,
    TranslatesEnum.VOISIN_MALIN_LI6,
    TranslatesEnum.VOISIN_MALIN_LI7,
    TranslatesEnum.VOISIN_MALIN_LI8,
    TranslatesEnum.VOISIN_MALIN_LI9,
    TranslatesEnum.VOISIN_MALIN_LI10,
  ];

  readonly chips: TranslatesEnum[] = [
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.NODEJS_10,
    TranslatesEnum.API,
    TranslatesEnum.GIT,
    TranslatesEnum.MYSQL,
    TranslatesEnum.AWS_AMPLIFY,
    TranslatesEnum.AWS_AURORA_SQL,
    TranslatesEnum.AWS_CLOUD,
    TranslatesEnum.AWS_CLOUD_FRONT,
    TranslatesEnum.AWS_COGNITO,
    TranslatesEnum.AWS_LAMBDA,
    TranslatesEnum.RXJS,
    TranslatesEnum.JIRA,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.HTML,
    TranslatesEnum.TYPESCRIPT,
    TranslatesEnum.CSS,
    TranslatesEnum.ANGULAR_7,
    TranslatesEnum.ANGULAR_MATERIAL,
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.ADAPTABILITY,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.VOISIN_MALIN,
      TranslatesEnum.M2SSIO,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.VOISIN_MALIN_PARAGRAPH,
      ...this.bulletList,
    ];
  }
}
