import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { RoutesEnum } from '../../shared/enums/routes.enum';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);

  private hasNavigatedInternally = false;

  readonly currentUrlSignal = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
  );

  readonly isContactRoute = computed(
    () => this.currentUrlSignal() === `/${RoutesEnum.CONTACT}`,
  );

  markInternalNavigation() {
    this.hasNavigatedInternally = true;
  }

  isInternalNavigation() {
    return this.hasNavigatedInternally;
  }
}
