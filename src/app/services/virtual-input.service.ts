import { Injectable, signal, WritableSignal } from '@angular/core';
import { GameEventsEnum } from '../enums/game-events.enum';
import { VirtualInputEnum } from '../enums/virtual-input.enum';
import { emitGameEvent } from '../helpers/game-event.helper';

@Injectable({ providedIn: 'root' })
export class VirtualInputService {
  private up = signal(false);
  private down = signal(false);
  private left = signal(false);
  private right = signal(false);
  private space = signal(false);

  private readonly keyMap = new Map<VirtualInputEnum, WritableSignal<boolean>>([
    [VirtualInputEnum.UP, this.up],
    [VirtualInputEnum.DOWN, this.down],
    [VirtualInputEnum.LEFT, this.left],
    [VirtualInputEnum.RIGHT, this.right],
    [VirtualInputEnum.SPACE, this.space],
  ]);

  private emitVirtualInputEvent(): void {
    emitGameEvent<GameEventsEnum.VIRTUAL_INPUT>(GameEventsEnum.VIRTUAL_INPUT, {
      up: this.up(),
      down: this.down(),
      left: this.left(),
      right: this.right(),
      space: this.space(),
    });
  }

  private setKeyState(key: VirtualInputEnum, state: boolean): void {
    const signal = this.keyMap.get(key);
    signal?.set(state);
  }

  onKeyPress(key: VirtualInputEnum): void {
    this.setKeyState(key, true);
    this.emitVirtualInputEvent();
  }

  onKeyRelease(key: VirtualInputEnum): void {
    this.setKeyState(key, false);
    this.emitVirtualInputEvent();
  }
}
