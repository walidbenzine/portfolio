import Phaser from 'phaser';
import { ScenesEnum } from '../enums/scenes.enum';

export interface GameRouteConfigInterface {
  sceneKey: ScenesEnum;
  sceneClass: Phaser.Types.Scenes.SceneType;
}
