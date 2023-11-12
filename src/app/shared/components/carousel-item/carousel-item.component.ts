import { Component, Input } from '@angular/core';
import { ResourceComponent } from '../resource-component/resource-component.component';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent extends ResourceComponent {
  @Input() logos: string[] = [];
}
