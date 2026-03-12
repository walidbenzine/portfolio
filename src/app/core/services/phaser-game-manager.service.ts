import { computed, inject, Injectable } from '@angular/core';
import Phaser from 'phaser';
import { InitSceneInterface } from '../../shared/interfaces/init-scene.interface';
import { GameRouteConfigInterface } from '../../shared/interfaces/game-route-config.interface';
import { LoaderService } from './loader.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoutesEnum } from '../../shared/enums/routes.enum';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhaserGameManagerService {
  private readonly loaderService = inject(LoaderService);
  private readonly router = inject(Router);

  private readonly routesWithoutScenes = [RoutesEnum.CONTACT];
  private readonly parentId = 'phaser-game-container';

  private game: Phaser.Game | null = null;
  private activeSceneKey: string | null = null;

  private readonly currentUrlSignal = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
  );

  shouldHideGameContainerDiv = computed(() =>
    this.isRouteWithoutScene(this.currentUrlSignal()),
  );

  private isRouteWithoutScene(route: string | undefined): boolean {
    return this.routesWithoutScenes.some((r) => `/${r}` === route);
  }

  activateScene(
    routeConfig: GameRouteConfigInterface,
    data: InitSceneInterface,
  ): void {
    this.loaderService.show();
    const game = this.ensureGame(routeConfig);
    this.ensureSceneRegistered(routeConfig);
    this.game?.loop?.wake();
    this.showCanvas();
    this.stopActiveScene(routeConfig.sceneKey as string);
    game.scene.start(routeConfig.sceneKey as string, data);
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

  private ensureGame(routeConfig: GameRouteConfigInterface): Phaser.Game {
    if (this.game) {
      return this.game;
    }

    this.game = new Phaser.Game({
      type: Phaser.WEBGL,
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
      this.game.scene.stop(this.activeSceneKey);
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
