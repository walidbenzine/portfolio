import { MapConfigInterface } from '../../shared/interfaces/map-config.interface';
import { PlayerConfigInterface } from '../../shared/interfaces/player-config.interface';
import { BaseGameScene } from '../../shared/components/base/base-game-scene';

export class ExperiencesGameScene extends BaseGameScene {
  protected readonly mapConfig: MapConfigInterface = {
    path: '/house/map.json',
    tilesPath: '/house/tileset.webp',
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
    backgroundMusicPath: '/music/bg-music.mp3',
  };

  protected readonly playerConfig: PlayerConfigInterface = {
    size: { x: 128, y: 128 },
    offset: { x: 360, y: 433 },
    initialPosition: { x: 2530, y: 1000 },
    speed: 500,
    scale: 0.9,
  };
}
