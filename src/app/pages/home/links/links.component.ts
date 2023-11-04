import { Component, OnInit } from '@angular/core';
import { GravityButtonService } from 'src/app/shared/services/gravity-button.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  constructor(
    private gravityButtonService: GravityButtonService,
  ) { }

  ngOnInit(): void {
    this.gravityButtonService.subscribeToMouseMove(document);
  }
}
