import { Component } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';

@Component({
  selector: 'app-usthb1',
  templateUrl: './usthb1.component.html',
  imports: [DialogComponent],
})
export class Usthb1Component extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.USTHB1LI1,
    TranslatesEnum.USTHB1LI2,
    TranslatesEnum.USTHB1LI3,
    TranslatesEnum.USTHB1LI4,
    TranslatesEnum.USTHB1LI5,
    TranslatesEnum.USTHB1LI6,
    TranslatesEnum.USTHB1LI7,
    TranslatesEnum.USTHB1LI8,
    TranslatesEnum.USTHB1LI9,
    TranslatesEnum.USTHB1LI10,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.USTHB1,
      TranslatesEnum.LICENCE_TELECOM,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.USTHB1PARAGRAPH1,
      TranslatesEnum.USTHB1PARAGRAPH2,
      ...this.bulletList,
    ];
  }
}
