import { Component, computed } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-capgemini',
  templateUrl: './capgemini.component.html',
  styles: `
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `,
  imports: [DialogComponent, MatChip],
})
export class CapgeminiComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.CAPGEMINI_LI1,
    TranslatesEnum.CAPGEMINI_LI2,
    TranslatesEnum.CAPGEMINI_LI3,
    TranslatesEnum.CAPGEMINI_LI4,
    TranslatesEnum.CAPGEMINI_LI5,
    TranslatesEnum.CAPGEMINI_LI6,
    TranslatesEnum.CAPGEMINI_LI7,
  ];

  readonly chips = [
    TranslatesEnum.AGILE_METHODOLOGY,
    TranslatesEnum.ANGULAR_7,
    TranslatesEnum.ANGULAR_MATERIAL,
    TranslatesEnum.RXJS,
    TranslatesEnum.NODEJS_10,
    TranslatesEnum.AWS_AMPLIFY,
    TranslatesEnum.AWS_CLOUD,
    TranslatesEnum.AWS_COGNITO,
    TranslatesEnum.AWS_AURORA_SQL,
    TranslatesEnum.AWS_CLOUD_FRONT,
    TranslatesEnum.MYSQL,
    TranslatesEnum.JIRA,
    TranslatesEnum.GIT,
    TranslatesEnum.TYPESCRIPT,
    TranslatesEnum.JAVASCRIPT,
    TranslatesEnum.HTML,
    TranslatesEnum.CSS,
  ];

  readonly subTitle = computed(
    () =>
      `${this.translations().get(TranslatesEnum.SOFTWARE_ENGINEER)} - ${this.translations().get(TranslatesEnum.INTERNSHIP)}`,
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.CAPGEMINI,
      TranslatesEnum.SOFTWARE_ENGINEER,
      TranslatesEnum.INTERNSHIP,
      TranslatesEnum.CAPGEMINI_PARAGRAPH,
      TranslatesEnum.SKILLS_ACQUIRED,
      ...this.bulletList,
      ...this.chips,
    ];
  }
}
