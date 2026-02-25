import { Component, computed } from '@angular/core';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BaseTranslationsComponent } from '../../../../base/base-translations.component';
import { TranslatesEnum } from '../../../../enums/translates.enum';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-nfg',
  templateUrl: './nfg.component.html',
  styles: `
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .youtubeVideo {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 10px 0;

      iframe {
        width: 100%;
        max-width: 800px;
        aspect-ratio: 2;
      }
    }
  `,
  imports: [DialogComponent, MatChip],
})
export class NfgComponent extends BaseTranslationsComponent {
  readonly bulletList: TranslatesEnum[] = [
    TranslatesEnum.NFG_LI1,
    TranslatesEnum.NFG_LI2,
    TranslatesEnum.NFG_LI3,
    TranslatesEnum.NFG_LI4,
    TranslatesEnum.NFG_LI5,
    TranslatesEnum.NFG_LI6,
  ];

  readonly chips = [
    TranslatesEnum.TEAM_WORK,
    TranslatesEnum.ARTISTIC_PERFORMANCES,
    TranslatesEnum.COMMUNICATION,
    TranslatesEnum.CREATIVITY,
    TranslatesEnum.ADAPTABILITY,
    TranslatesEnum.MARKETING,
    TranslatesEnum.PROSPECTING,
    TranslatesEnum.COMMERCIAL_NEGOTIATION,
    TranslatesEnum.NETWORKING,
  ];

  readonly subTitle = computed(
    () =>
      `${this.translations().get(TranslatesEnum.LIVE_PERFORMANCE_ARTIST)} - ${this.translations().get(TranslatesEnum.FREELANCE)}`,
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.NFG,
      TranslatesEnum.LIVE_PERFORMANCE_ARTIST,
      TranslatesEnum.FREELANCE,
      TranslatesEnum.NFG_PARAGRAPH,
      TranslatesEnum.SKILLS_ACQUIRED,
      ...this.bulletList,
      ...this.chips,
    ];
  }
}
