import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogConfig } from '@angular/material/dialog';

export interface DialogComponentConfigInterface {
  component: ComponentType<any>;
  config?: MatDialogConfig;
}
