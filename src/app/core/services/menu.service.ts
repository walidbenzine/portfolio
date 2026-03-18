import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private sidenav!: MatSidenav;

  setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  open(): Promise<MatDrawerToggleResult> {
    return this.sidenav?.open();
  }

  close(): Promise<MatDrawerToggleResult> {
    return this.sidenav?.close();
  }

  toggle(): Promise<MatDrawerToggleResult> {
    return this.sidenav?.toggle();
  }
}
