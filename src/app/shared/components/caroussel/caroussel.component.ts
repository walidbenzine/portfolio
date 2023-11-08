import { Component, Input } from '@angular/core';
import { CarousselItem } from '../../interfaces/caroussel-item.interface';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.scss']
})
export class CarousselComponent {

  @Input() items: CarousselItem[] = [];

}
