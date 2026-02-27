import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-usthb1',
  templateUrl: './usthb1.component.html',
  imports: [DialogComponent, ChipsComponent],
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
      TranslatesEnum.USTHB1,
      TranslatesEnum.LICENCE_TELECOM,
      TranslatesEnum.SKILLS_ACQUIRED,
      TranslatesEnum.USTHB1PARAGRAPH1,
      TranslatesEnum.USTHB1PARAGRAPH2,
      ...this.bulletList,
    ];
  }
}
