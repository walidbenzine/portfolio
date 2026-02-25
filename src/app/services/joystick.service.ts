import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { RoutesEnum } from '../enums/routes.enum';

@Injectable({ providedIn: 'root' })
export class JoystickService {
  private readonly router = inject(Router);

  private readonly currentUrlSignal = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
  );

  private readonly _isVisible = signal(true);

  private readonly routesWithoutJosytick = [RoutesEnum.CONTACT];

  isJoystickDisabled = computed(() =>
    this.isRouteWithoutJoystick(this.currentUrlSignal()),
  );

  isVisible = computed(() => this._isVisible() && !this.isJoystickDisabled());

  private isRouteWithoutJoystick(route: string | undefined): boolean {
    return this.routesWithoutJosytick.some((r) => `/${r}` === route);
  }

  setVisibility(visible: boolean): void {
    this._isVisible.set(visible);
  }
}
