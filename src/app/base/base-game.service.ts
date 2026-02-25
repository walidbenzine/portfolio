import { Injectable, signal } from '@angular/core';
import { XYInterface } from '../interfaces/xy.interface';

@Injectable()
export class BaseGameService {
    private readonly playerPosition = signal<XYInterface | null>(null);

    setPlayerPosition(x: number, y: number): void {
        this.playerPosition.set({ x, y });
    }

    getPlayerPosition(): XYInterface | null {
        return this.playerPosition();
    }
}
