import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationService } from './navigation.service';

@Injectable({ providedIn: 'root' })
export class JoystickService {
  private readonly navigationService = inject(NavigationService);

  private readonly _isVisible = signal(true);

  isJoystickDisabled = computed(() => this.navigationService.isContactRoute());

  isVisible = computed(() => this._isVisible() && !this.isJoystickDisabled());

  setVisibility(visible: boolean): void {
    this._isVisible.set(visible);
  }
}
