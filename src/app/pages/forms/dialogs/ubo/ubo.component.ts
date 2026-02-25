import { Component } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';

@Component({
  selector: 'app-ubo',
  templateUrl: './ubo.component.html',
  imports: [DialogComponent],
})
export class UboComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.UBOLI1,
    TranslatesEnum.UBOLI2,
    TranslatesEnum.UBOLI3,
    TranslatesEnum.UBOLI4,
    TranslatesEnum.UBOLI5,
    TranslatesEnum.UBOLI6,
    TranslatesEnum.UBOLI7,
    TranslatesEnum.UBOLI8,
    TranslatesEnum.UBOLI9,
    TranslatesEnum.UBOLI10,
    TranslatesEnum.UBOLI11,
    TranslatesEnum.UBOLI12,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.UBO,
      TranslatesEnum.M1RT,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.UBOPARAGRAPH1,
      TranslatesEnum.UBOPARAGRAPH2,
      ...this.bulletList,
    ];
  }
}
