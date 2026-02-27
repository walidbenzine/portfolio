import { Component, HostListener, inject, signal } from '@angular/core';
import { VirtualInputEnum } from '../../../shared/enums/virtual-input.enum';
import { VirtualInputService } from '../../services/virtual-input.service';

type Direction =
  | 'center'
  | VirtualInputEnum.LEFT
  | VirtualInputEnum.RIGHT
  | VirtualInputEnum.UP
  | VirtualInputEnum.DOWN;

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent {
  private readonly virtualInputService = inject(VirtualInputService);
  private readonly radius = 40;

  transform = signal('translate(0,0)');
  direction: Direction = 'center';

  private readonly transformMap = new Map<Direction, string>([
    [VirtualInputEnum.LEFT, `translate(${-this.radius}px, 0)`],
    [VirtualInputEnum.RIGHT, `translate(${this.radius}px, 0)`],
    [VirtualInputEnum.UP, `translate(0, ${-this.radius}px)`],
    [VirtualInputEnum.DOWN, `translate(0, ${this.radius}px)`],
    ['center', 'translate(0,0)'],
  ]);

  private readonly keyToDirection: Record<string, Direction> = {
    ArrowUp: VirtualInputEnum.UP,
    ArrowDown: VirtualInputEnum.DOWN,
    ArrowLeft: VirtualInputEnum.LEFT,
    ArrowRight: VirtualInputEnum.RIGHT,
  };

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  handleKey(event: KeyboardEvent) {
    const dir = this.keyToDirection[event.code];
    if (!dir) return this.setDirection('center');

    if (event.type === 'keydown') {
      this.setDirection(dir);
    } else if (event.type === 'keyup') {
      if (this.direction === dir) this.setDirection('center');
    }
  }

  start(event: PointerEvent): void {
    const target = event.target as HTMLElement;
    target.setPointerCapture(event.pointerId);

    const startX = event.clientX;
    const startY = event.clientY;

    const move = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.abs(dx) < 10 && Math.abs(dy) < 10)
        return this.setDirection('center');

      const dir: Direction =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? VirtualInputEnum.RIGHT
            : VirtualInputEnum.LEFT
          : dy > 0
            ? VirtualInputEnum.DOWN
            : VirtualInputEnum.UP;

      this.setDirection(dir);
    };

    const stop = () => {
      this.setDirection('center');
      target.releasePointerCapture(event.pointerId);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  }

  private setDirection(dir: Direction) {
    if (this.direction === dir) return;

    if (this.direction !== 'center') {
      this.virtualInputService.onKeyRelease(this.direction as VirtualInputEnum);
    }

    this.direction = dir;
    this.transform.set(this.transformMap.get(dir) ?? 'translate(0,0)');

    if (dir !== 'center') {
      this.virtualInputService.onKeyPress(dir as VirtualInputEnum);
    }
  }
}
