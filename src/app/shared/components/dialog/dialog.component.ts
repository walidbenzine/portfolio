import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { PeriodComponent } from '../period/period.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatIcon,
    MatButtonModule,
    PeriodComponent,
  ],
})
export class DialogComponent {
  imgPath = input.required<string>();
  firstTitle = input.required<string | undefined>();
  subtitle = input.required<string | undefined>();
  startDate = input<string | undefined>();
  endDate = input<string | undefined>();
}
