import { AfterViewInit, Component } from '@angular/core';
import { RoutesEnum } from '../../enums/routes.enum';
import { GravityButtonService } from '../../services/gravity-button.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  pages = [RoutesEnum.HOME, RoutesEnum.SKILLS, RoutesEnum.EXPERIENCES, RoutesEnum.FORMATIONS];

  constructor(
    private gravityButtonService: GravityButtonService,
    public navBarService: NavbarService,
  ) { }

  ngAfterViewInit(): void {
    this.gravityButtonService.subscribeToMouseMove(document);
  }
}
