import { computed, inject, Injectable, signal } from '@angular/core';
import { emitGameEvent } from '../../shared/helpers/game-event.helper';
import { GameEventsEnum } from '../../shared/enums/game-events.enum';
import { NavigationService } from './navigation.service';

@Injectable({ providedIn: 'root' })
export class GameSoundService {
  private readonly navigationService = inject(NavigationService);

  private readonly _isEnabled = signal(false); // todo: mettre en true par défaut

  isGameSoundDisabled = computed(() => this.navigationService.isContactRoute());

  isEnabled = computed(() => this._isEnabled() && !this.isGameSoundDisabled());

  setEnability(enabled: boolean): void {
    this._isEnabled.set(enabled);
    emitGameEvent(GameEventsEnum.SOUND_SETTING_CHANGED, { enabled });
  }
}
