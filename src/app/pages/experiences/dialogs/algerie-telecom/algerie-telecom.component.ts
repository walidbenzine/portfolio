import { Component, computed } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { MatChip } from '@angular/material/chips';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';

@Component({
  selector: 'app-algerie-telecom',
  templateUrl: './algerie-telecom.component.html',
  styles: `
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `,
  imports: [DialogComponent, MatChip],
})
export class AlgerieTelecomComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.ALGERIE_TELECOM_LI1,
    TranslatesEnum.ALGERIE_TELECOM_LI2,
    TranslatesEnum.ALGERIE_TELECOM_LI3,
    TranslatesEnum.ALGERIE_TELECOM_LI4,
    TranslatesEnum.ALGERIE_TELECOM_LI5,
    TranslatesEnum.ALGERIE_TELECOM_LI6,
  ];

  readonly subTitle = computed(
    () =>
      `${this.translations().get(TranslatesEnum.COMPUTER_NETWORK_SECURITY)} - ${this.translations().get(TranslatesEnum.INTERNSHIP)}`,
  );

  readonly chips = [
    TranslatesEnum.CISCO_TECHNOLOGIES,
    TranslatesEnum.GNS3,
    TranslatesEnum.WIRESHARK,
    TranslatesEnum.PACKET_TRACER,
    TranslatesEnum.VM_WARE,
    TranslatesEnum.NETWORK_SECURITY,
    TranslatesEnum.NETWORK_DESIGN,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.TEAM_WORK,
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.ALGERIE_TELECOM,
      TranslatesEnum.COMPUTER_NETWORK_SECURITY,
      TranslatesEnum.INTERNSHIP,
      TranslatesEnum.ALGERIE_TELECOM_PARAGRAPH,
      TranslatesEnum.SKILLS_ACQUIRED,
      ...this.bulletList,
      ...this.chips,
    ];
  }
}
