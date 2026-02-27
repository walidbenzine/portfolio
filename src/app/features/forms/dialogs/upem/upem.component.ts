import { Component } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../../shared/enums/translates.enum';
import { ChipsComponent } from '../../../../shared/components/chips/chips.component';

@Component({
  selector: 'app-upem',
  templateUrl: './upem.component.html',
  imports: [DialogComponent, ChipsComponent],
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

  readonly chips: TranslatesEnum[] = [
    TranslatesEnum.CISCO_TECHNOLOGIES,
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.NETWORK_DESIGN,
    TranslatesEnum.NETWORK_SECURITY,
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.PYTHON,
    TranslatesEnum.LINUX,
    TranslatesEnum.JAVA,
    TranslatesEnum.JAVA_EE,
    TranslatesEnum.SPRING_BOOT,
    TranslatesEnum.IA,
    TranslatesEnum.ZIGBEE,
    TranslatesEnum.LORA,
    TranslatesEnum.IOT,
    TranslatesEnum.GIT,
    TranslatesEnum.MYSQL,
    TranslatesEnum.HTML,
    TranslatesEnum.CSS,
    TranslatesEnum.JAVASCRIPT,
    TranslatesEnum.OFFICE_PACK,
    TranslatesEnum.VM_WARE,
    TranslatesEnum.WIRESHARK,
    TranslatesEnum.ADAPTABILITY,
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
