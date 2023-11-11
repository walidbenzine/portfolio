import { Component, OnInit } from '@angular/core';
import { ResourceComponent } from 'src/app/shared/components/resource-component/resource-component.component';
import { GravityButtonService } from 'src/app/shared/services/gravity-button.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent extends ResourceComponent implements OnInit {

  constructor(
    private gravityButtonService: GravityButtonService,
  ) {
    super();
   }

  ngOnInit(): void {
    this.gravityButtonService.subscribeToMouseMove(document);
  }
}
