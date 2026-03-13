import { computed, inject, Injectable, signal } from '@angular/core';
import { emitGameEvent } from '../../shared/helpers/game-event.helper';
import { GameEventsEnum } from '../../shared/enums/game-events.enum';
import { NavigationService } from './navigation.service';
import { StorageService } from './storage.service';
import { StorageEnum } from '../../shared/enums/storage.enum';

@Injectable({ providedIn: 'root' })
export class GameSoundService {
  private readonly navigationService = inject(NavigationService);
  private readonly storageService = inject(StorageService);

  private readonly _isEnabled = signal(
    this.storageService.getItem<boolean>(StorageEnum.SOUND) ?? true,
  );

  isGameSoundDisabled = computed(() => this.navigationService.isContactRoute());

  isEnabled = computed(() => this._isEnabled() && !this.isGameSoundDisabled());

  setEnability(enabled: boolean): void {
    this._isEnabled.set(enabled);
    this.storageService.setItem(StorageEnum.SOUND, enabled);
    emitGameEvent(GameEventsEnum.SOUND_SETTING_CHANGED, { enabled });
  }
}
