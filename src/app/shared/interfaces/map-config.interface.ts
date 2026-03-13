import { GameAssets } from '../enums/game-assets.enum';

export interface MapConfigInterface {
  map: GameAssets;
  tileset: GameAssets;
  tileWidth: number;
  tileHeight: number;
  tileSetName: string;
  width: number;
  height: number;

  tileSpacing?: number;
  tileMargin?: number;
  groundLayerName?: string;
  decorationLayerName?: string;
  collisionsLayerName?: string;
  textsLayerName?: string;
  interactivesLayerName?: string;
  interactionDistance?: number;
}
