import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavbarService {

    isMenuOpened: boolean = false;

    menuClick(): void {
        this.isMenuOpened = !this.isMenuOpened;
    }

    hideMenu(): void {
        this.isMenuOpened = false;
    }
}
