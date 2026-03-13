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
    initialPosition: { x: 2530, y: 1000 },
    speed: 400,
    scale: 0.5,
  };

  protected override minVisibleWidthCoefficient = 5;
  protected override maxVisibleWidthCoefficient = 3;
  protected override minVisibleHeightCoefficient = 3;
  protected override maxVisibleHeightCoefficient = 2;
}
