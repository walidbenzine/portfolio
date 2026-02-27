import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-usthb2',
  templateUrl: './usthb2.component.html',
  imports: [DialogComponent, ChipsComponent],
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

  readonly chips: TranslatesEnum[] = [
    TranslatesEnum.CISCO_TECHNOLOGIES,
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.NETWORK_DESIGN,
    TranslatesEnum.NETWORK_SECURITY,
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.MATLAB,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.VM_WARE,
    TranslatesEnum.GNS3,
    TranslatesEnum.WIRESHARK,
    TranslatesEnum.PACKET_TRACER,
    TranslatesEnum.ADAPTABILITY,
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
