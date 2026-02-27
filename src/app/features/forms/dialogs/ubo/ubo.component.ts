import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-ubo',
  templateUrl: './ubo.component.html',
  imports: [DialogComponent, ChipsComponent],
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

  readonly chips: TranslatesEnum[] = [
    TranslatesEnum.CISCO_TECHNOLOGIES,
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.NETWORK_DESIGN,
    TranslatesEnum.NETWORK_SECURITY,
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.MATLAB,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.VM_WARE,
    TranslatesEnum.WIRESHARK,
    TranslatesEnum.PACKET_TRACER,
    TranslatesEnum.ADAPTABILITY,
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
