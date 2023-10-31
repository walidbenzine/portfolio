import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  template: `
    <div class="card-glass">
      <h1>{{ title | uppercase}}</h1>
      <ng-content></ng-content>
    </div>
  `,
})
export class CardItemComponent {
  @Input() title: string = '';
}
