import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { RoutesEnum } from '../../shared/enums/routes.enum';
import { emitGameEvent } from '../../shared/helpers/game-event.helper';
import { GameEventsEnum } from '../../shared/enums/game-events.enum';

@Injectable({ providedIn: 'root' })
export class GameSoundService {
  private readonly router = inject(Router);

  private readonly currentUrlSignal = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
  );

  private readonly _isEnabled = signal(false); // todo: mettre en true par défaut

  private readonly routesWithoutSound = [RoutesEnum.CONTACT];

  isGameSoundDisabled = computed(() =>
    this.isRouteWithoutSound(this.currentUrlSignal()),
  );

  isEnabled = computed(() => this._isEnabled() && !this.isGameSoundDisabled());

  private isRouteWithoutSound(route: string | undefined): boolean {
    return this.routesWithoutSound.some((r) => `/${r}` === route);
  }

  setEnability(enabled: boolean): void {
    this._isEnabled.set(enabled);
    emitGameEvent(GameEventsEnum.SOUND_SETTING_CHANGED, { enabled });
  }
}
