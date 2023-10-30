import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from '../../enums/routes.enum';
import { GravityButtonService } from '../../services/gravity-button.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar">
      <nav-item *ngFor="let page of pages" (onClick)="onClickItem(page)"> {{ page | uppercase }}</nav-item>
      <theme-controller></theme-controller>
      <app-language-selector></app-language-selector>
    </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  pages = [RoutesEnum.HOME, RoutesEnum.SKILLS, RoutesEnum.EXPERIENCES, RoutesEnum.FORMATION, RoutesEnum.CONTACT];

  constructor(
    private router: Router,
    private gravityButtonService: GravityButtonService,
  ) { }

  ngAfterViewInit(): void {
    this.gravityButtonService.subscribeToMouseMove(document);
  }

  onClickItem(route: RoutesEnum): void {
    this.router.navigate([route]);
  }
}
