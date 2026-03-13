import { MapConfigInterface } from '../../shared/interfaces/map-config.interface';
import { PlayerConfigInterface } from '../../shared/interfaces/player-config.interface';
import { BaseGameScene } from '../../shared/components/base/base-game-scene';
import { GameAssets } from '../../shared/enums/game-assets.enum';

export class HomeGameScene extends BaseGameScene {
  protected readonly mapConfig: MapConfigInterface = {
    map: GameAssets.HOME_MAP,
    tileset: GameAssets.HOME_TILESET,
    tileWidth: 64,
    tileHeight: 64,
    width: 5120,
    height: 2560,
    tileSetName: 'tileset',
    groundLayerName: 'Ground',
    collisionsLayerName: 'Collisions',
    textsLayerName: 'Texts',
    interactivesLayerName: 'Interactions',
    interactionDistance: 300,
  };

  protected readonly playerConfig: PlayerConfigInterface = {
    size: { x: 128, y: 128 },
    offset: { x: 360, y: 433 },
    initialPosition: { x: 2530, y: 1100 },
    speed: 400,
    scale: 0.5,
  };

  protected override getMinVisibleWidthCoefficient(): number {
    return this.isBigScreen() ? 4 : 6;
  }
  protected override getMaxVisibleWidthCoefficient(): number {
    return 3;
  }
  protected override getMinVisibleHeightCoefficient(): number {
    return this.isBigScreen() ? 2 : 4;
  }
  protected override getMaxVisibleHeightCoefficient(): number {
    return 2;
  }

  private isBigScreen(): boolean {
    return window.innerHeight > 1000 || window.innerWidth > 1000;
  }
}
