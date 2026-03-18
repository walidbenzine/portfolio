import { computed, effect, inject, Injectable } from '@angular/core';
import { InitSceneInterface } from '../../shared/interfaces/init-scene.interface';
import { GameRouteConfigInterface } from '../../shared/interfaces/game-route-config.interface';
import { LoaderService } from './loader.service';
import { NavigationService } from './navigation.service';
import { BaseBootScene } from '../../shared/components/base/base-boot-scene';
import { GameEventsEnum } from '../../shared/enums/game-events.enum';
import { AppTourService } from './app-tour.service';

@Injectable({ providedIn: 'root' })
export class PhaserGameManagerService {
  private readonly loaderService = inject(LoaderService);
  private readonly appTourService = inject(AppTourService);
  private readonly navigationService = inject(NavigationService);

  private readonly parentId = 'phaser-game-container';
  private gameReady!: Promise<void>;
  private resolveGameReady!: () => void;

  private game: Phaser.Game | null = null;
  private activeSceneKey: string | null = null;

  shouldHideGameContainerDiv = computed(() =>
    this.navigationService.isContactRoute(),
  );

  constructor() {
    effect(() => {
      const isTourActive = this.appTourService.isTourActive();
      isTourActive ? this.game?.pause() : this.game?.resume();
    });
  }

  async activateScene(
    routeConfig: GameRouteConfigInterface,
    data: InitSceneInterface,
  ): Promise<void> {
    this.loaderService.show();
    const game = this.ensureGame();
    await this.gameReady;
    this.ensureSceneRegistered(routeConfig);
    this.game?.loop?.wake();
    this.showCanvas();
    this.stopActiveScene(routeConfig.sceneKey);
    if (game.scene.isSleeping(routeConfig.sceneKey)) {
      game.scene.wake(routeConfig.sceneKey);
    } else {
      game.scene.start(routeConfig.sceneKey, data);
    }
    this.activeSceneKey = routeConfig.sceneKey as string;

    game.events.once(Phaser.Core.Events.POST_RENDER, () => {
      this.loaderService.hide();
    });
  }

  deactivateScene(sceneKey: string): void {
    if (!this.game || this.activeSceneKey !== sceneKey) {
      return;
    }

    this.game.scene.stop(sceneKey);
    this.activeSceneKey = null;
    this.game.loop.sleep();
    this.hideCanvas();
  }

  private ensureGame(): Phaser.Game {
    if (this.game) {
      return this.game;
    }

    this.gameReady = new Promise((resolve) => {
      this.resolveGameReady = resolve;
    });

    this.game = new Phaser.Game({
      type: Phaser.WEBGL,
      scene: BaseBootScene,
      parent: this.parentId,
      pixelArt: true,
      roundPixels: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true,
      },
    });

    this.game.events.once(GameEventsEnum.BOOT_COMPLETED, () => {
      this.appTourService.startTour();
      this.resolveGameReady();
    });

    return this.game;
  }

  private ensureSceneRegistered(routeConfig: GameRouteConfigInterface): void {
    const sceneKey = routeConfig.sceneKey as string;

    if (this.game?.scene.getIndex(sceneKey) === -1) {
      this.game?.scene.add(sceneKey, routeConfig.sceneClass, false);
    }
  }

  private stopActiveScene(nextSceneKey: string): void {
    if (
      this.game &&
      this.activeSceneKey &&
      this.activeSceneKey !== nextSceneKey &&
      this.game.scene.isActive(this.activeSceneKey)
    ) {
      this.game.scene.sleep(this.activeSceneKey);
    }
  }

  private showCanvas(): void {
    if (this.game?.canvas) {
      this.game.canvas.style.display = 'flex';
    }
  }

  private hideCanvas(): void {
    if (this.game?.canvas) {
      this.game.canvas.style.display = 'none';
    }
  }
}
