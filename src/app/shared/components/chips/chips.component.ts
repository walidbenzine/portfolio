import { Component, input } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { TranslatesEnum } from '../../enums/translates.enum';
import { BaseTranslationsComponent } from '../base/base-translations.component';

@Component({
  selector: 'app-chips',
  template: `
    <div class="chips">
      @for (chip of chips(); track chip) {
        <mat-chip color="primary">{{ translations().get(chip) }}</mat-chip>
      }
    </div>
  `,
  styles: `
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `,
  imports: [MatChip],
})
export class ChipsComponent extends BaseTranslationsComponent {
  chips = input.required<TranslatesEnum[]>();

  protected override getTextsList(): TranslatesEnum[] {
    return this.chips();
  }
}
