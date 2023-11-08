import { Component, OnInit } from '@angular/core';
import { CarousselItem } from 'src/app/shared/interfaces/caroussel-item.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  items: CarousselItem[] = [];

  ngOnInit(): void {
    this.items = [
      { 
        index: 0,
        name: 'viveris',
      },
      {
        index: 1,
        name: 'telecom',
      },
    ]
  }

}
