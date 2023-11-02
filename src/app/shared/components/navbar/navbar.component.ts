import { AfterViewInit, Component } from '@angular/core';
import { RoutesEnum } from '../../enums/routes.enum';
import { GravityButtonService } from '../../services/gravity-button.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar">
      <h1>Walid.</h1>
      <nav-item *ngFor="let page of pages" [page]="page"></nav-item>
      <div class="icons">
        <theme-controller></theme-controller>
        <app-language-selector></app-language-selector>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  pages = [RoutesEnum.HOME, RoutesEnum.SKILLS, RoutesEnum.EXPERIENCES, RoutesEnum.FORMATION, RoutesEnum.CONTACT];

  constructor(
    private gravityButtonService: GravityButtonService,
  ) { }

  ngAfterViewInit(): void {
    this.gravityButtonService.subscribeToMouseMove(document);
  }
}
