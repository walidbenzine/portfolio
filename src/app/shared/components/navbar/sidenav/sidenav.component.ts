import { Component, ElementRef, HostListener } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.navBarService.hideMenu();
    }
  }

  constructor(
    private eRef: ElementRef,
    public navBarService: NavbarService,
  ) { }
}
