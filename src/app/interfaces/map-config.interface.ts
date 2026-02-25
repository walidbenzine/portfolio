export interface MapConfigInterface {
  path: string;
  tilesPath: string;
  tileWidth: number;
  tileHeight: number;
  tileSetName: string;
  width: number;
  height: number;
  backgroundMusicPath?: string;
  volume?: number;

  tileSpacing?: number;
  tileMargin?: number;
  groundLayerName?: string;
  decorationLayerName?: string;
  collisionsLayerName?: string;
  textsLayerName?: string;
  interactivesLayerName?: string;
  interactionDistance?: number;
}
