import { Directive, inject } from '@angular/core';
import { GenericInteractionsEnum } from '../enums/generic-interactions.enum';
import { DialogService } from '../services/dialog.service';
import { BaseGameComponent } from './base-game.component';
import { DialogComponentConfigInterface } from '../interfaces/dialog-component-config.interface';
import { OnInteractInterface } from '../interfaces/on-interact.interface';

@Directive()
export abstract class BaseGameHouseComponent extends BaseGameComponent {
  private readonly dialogService = inject(DialogService);

  protected abstract dialogMap: Map<
    GenericInteractionsEnum,
    DialogComponentConfigInterface
  >;

  protected override interactionsHandler = (
    e: CustomEvent<OnInteractInterface>,
  ) => {
    e.detail.dialog && this.openDialog(e.detail.dialog);
    e.detail.route && this.router.navigate([e.detail.route]);
  };

  private openDialog(dialogName: GenericInteractionsEnum): void {
    const dialog = this.dialogMap.get(dialogName);
    if (dialog) {
      this.dialogService.openDialog(dialog.component, dialog.config);
    }
  }

  protected override getScaleCoefficient(): number {
    return Math.min(window.innerWidth, window.innerHeight) < 800 ? 2.5 : 1.5;
  }
}
