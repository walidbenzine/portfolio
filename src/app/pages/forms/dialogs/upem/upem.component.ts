import { Component } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';

@Component({
  selector: 'app-upem',
  templateUrl: './upem.component.html',
  imports: [DialogComponent],
})
export class UpemComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.UPEMLI1,
    TranslatesEnum.UPEMLI2,
    TranslatesEnum.UPEMLI3,
    TranslatesEnum.UPEMLI4,
    TranslatesEnum.UPEMLI5,
    TranslatesEnum.UPEMLI6,
    TranslatesEnum.UPEMLI7,
    TranslatesEnum.UPEMLI8,
    TranslatesEnum.UPEMLI9,
    TranslatesEnum.UPEMLI10,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.UPEM,
      TranslatesEnum.M2SSIO,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.UPEMPARAGRAPH1,
      TranslatesEnum.UPEMPARAGRAPH2,
      ...this.bulletList,
    ];
  }
}
