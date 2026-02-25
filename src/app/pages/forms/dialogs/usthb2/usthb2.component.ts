import { Component } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';

@Component({
  selector: 'app-usthb2',
  templateUrl: './usthb2.component.html',
  imports: [DialogComponent],
})
export class Usthb2Component extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.USTHB2LI1,
    TranslatesEnum.USTHB2LI2,
    TranslatesEnum.USTHB2LI3,
    TranslatesEnum.USTHB2LI4,
    TranslatesEnum.USTHB2LI5,
    TranslatesEnum.USTHB2LI6,
    TranslatesEnum.USTHB2LI7,
    TranslatesEnum.USTHB2LI8,
    TranslatesEnum.USTHB2LI9,
    TranslatesEnum.USTHB2LI10,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.USTHB2,
      TranslatesEnum.M1RT,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.USTHB2PARAGRAPH1,
      TranslatesEnum.USTHB2PARAGRAPH2,
      ...this.bulletList,
    ];
  }
}
