import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationService } from './navigation.service';
import { StorageEnum } from '../../shared/enums/storage.enum';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class JoystickService {
  private readonly navigationService = inject(NavigationService);
  private readonly storageService = inject(StorageService);

  private readonly _isVisible = signal(
    this.storageService.getItem<boolean>(StorageEnum.JOYSTICK) ?? true,
  );

  isJoystickDisabled = computed(() => this.navigationService.isContactRoute());

  isVisible = computed(() => this._isVisible() && !this.isJoystickDisabled());

  setVisibility(visible: boolean): void {
    this.storageService.setItem(StorageEnum.JOYSTICK, visible);
    this._isVisible.set(visible);
  }
}
