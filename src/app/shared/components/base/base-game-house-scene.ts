import { GameAssets } from '../../enums/game-assets.enum';
import { MapConfigInterface } from '../../interfaces/map-config.interface';
import { PlayerConfigInterface } from '../../interfaces/player-config.interface';
import { BaseGameScene } from './base-game-scene';

export class BaseGameHouseScene extends BaseGameScene {
  protected readonly mapConfig: MapConfigInterface = {
    map: GameAssets.HOUSE_MAP,
    tileset: GameAssets.HOUSE_TILESET,
    tileWidth: 64,
    tileHeight: 64,
    width: 3840,
    height: 2560,
    tileSetName: 'tileset',
    groundLayerName: 'Ground',
    collisionsLayerName: 'Collisions',
    textsLayerName: 'Texts',
    interactivesLayerName: 'Interactions',
    decorationLayerName: 'Decorations',
    interactionDistance: 300,
  };

  protected readonly playerConfig: PlayerConfigInterface = {
    size: { x: 128, y: 128 },
    offset: { x: 360, y: 433 },
    initialPosition: { x: 2530, y: 1000 },
    speed: 600,
    scale: 0.9,
  };

  protected override getMinVisibleWidthCoefficient(): number {
    return this.isBigScreen() ? 1 : 3;
  }
  protected override getMaxVisibleWidthCoefficient(): number {
    return 2;
  }
  protected override getMinVisibleHeightCoefficient(): number {
    return this.isBigScreen() ? 1 : 3;
  }
  protected override getMaxVisibleHeightCoefficient(): number {
    return 2;
  }

  private isBigScreen(): boolean {
    return window.innerHeight > 1000 || window.innerWidth > 1000;
  }
}
