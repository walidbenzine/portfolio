import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly matDialog = inject(MatDialog);
  private isDialogOpened: boolean = false;

  openDialog(component: ComponentType<any>, config?: MatDialogConfig): void {
    if (!this.isDialogOpened) {
      const openedDialog = this.matDialog.open(component, {
        maxHeight: '85dvh',
        ...config,
      });

      this.isDialogOpened = true;
      openedDialog.afterClosed().subscribe(() => (this.isDialogOpened = false));
    }
  }
}
