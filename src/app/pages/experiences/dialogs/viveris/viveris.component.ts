import { Component, computed } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-viveris',
  templateUrl: './viveris.component.html',
  styles: `
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `,
  imports: [DialogComponent, MatChip],
})
export class ViverisComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.VIVERIS_LI1,
    TranslatesEnum.VIVERIS_LI2,
    TranslatesEnum.VIVERIS_LI3,
    TranslatesEnum.VIVERIS_LI4,
    TranslatesEnum.VIVERIS_LI5,
    TranslatesEnum.VIVERIS_LI6,
    TranslatesEnum.VIVERIS_LI7,
    TranslatesEnum.VIVERIS_LI8,
    TranslatesEnum.VIVERIS_LI9,
    TranslatesEnum.VIVERIS_LI10,
    TranslatesEnum.VIVERIS_LI11,
    TranslatesEnum.VIVERIS_LI12,
  ];

  readonly chips = [
    TranslatesEnum.ANGULAR12_13_14_17_19,
    TranslatesEnum.ANGULAR_MATERIAL,
    TranslatesEnum.DOT_NET_CORE,
    TranslatesEnum.C_SHARP,
    TranslatesEnum.ENTITY_FRAMEWORK,
    TranslatesEnum.AZURE_CLOUD,
    TranslatesEnum.NX,
    TranslatesEnum.SQL_SERVER,
    TranslatesEnum.ACCESSIBILITY,
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.ANGULAR_LIBRARY,
    TranslatesEnum.ANGULAR_MIGRATION,
    TranslatesEnum.AZURE_DEVOPS,
    TranslatesEnum.CODE_REVIEW,
    TranslatesEnum.CI_CD,
    TranslatesEnum.PERFORMANCE,
    TranslatesEnum.REFACTORING,
    TranslatesEnum.ARCHITECTURE,
    TranslatesEnum.TECHNICAL_DESIGN,
    TranslatesEnum.DOCUMENTATION,
    TranslatesEnum.BUSINESS_ANALYSIS,
    TranslatesEnum.CLIENT_MEETINGS,
    TranslatesEnum.INSURANCE,
    TranslatesEnum.PRODUCT_DESIGN,
    TranslatesEnum.MAINTENANCE,
    TranslatesEnum.MENTORING,
    TranslatesEnum.TECHNICAL_INTERVIEWS,
    TranslatesEnum.RECRUITMENT_TESTS,
    TranslatesEnum.TECH_TALKS,
    TranslatesEnum.CODE_REVIEW,
    TranslatesEnum.RXJS,
    TranslatesEnum.GIT,
    TranslatesEnum.TYPESCRIPT,
    TranslatesEnum.JAVASCRIPT,
    TranslatesEnum.HTML,
    TranslatesEnum.SCSS,
  ];

  readonly subTitle = computed(
    () =>
      `${this.translations().get(TranslatesEnum.SOFTWARE_ENGINEER)} - ${this.translations().get(TranslatesEnum.CDI)}`,
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.VIVERIS,
      TranslatesEnum.SOFTWARE_ENGINEER,
      TranslatesEnum.CDI,
      TranslatesEnum.VIVERIS_PARAGRAPH1,
      TranslatesEnum.VIVERIS_PARAGRAPH2,
      TranslatesEnum.SKILLS_ACQUIRED,
      ...this.bulletList,
      ...this.chips,
    ];
  }
}
