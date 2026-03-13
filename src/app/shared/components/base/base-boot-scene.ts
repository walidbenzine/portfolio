import { GameAssets } from '../../enums/game-assets.enum';
import { GameEventsEnum } from '../../enums/game-events.enum';
import { PlayerAnimationKeys } from '../../enums/player-anumation-keys.enum';
import { ScenesEnum } from '../../enums/scenes.enum';
import Phaser from 'phaser';

export class BaseBootScene extends Phaser.Scene {
  constructor() {
    super(ScenesEnum.BOOT);
  }

  preload() {
    Object.values(PlayerAnimationKeys).forEach((anim) => {
      this.load.spritesheet(anim, `./player/${anim}.webp`, {
        frameWidth: 840,
        frameHeight: 720,
      });
    });

    this.load.audio(GameAssets.MUSIC, './music/music.mp3');

    this.load.image(GameAssets.HOME_TILESET, './home/tileset.webp');
    this.load.tilemapTiledJSON(GameAssets.HOME_MAP, './home/map.json');

    this.load.image(GameAssets.HOUSE_TILESET, './house/tileset.webp');
    this.load.tilemapTiledJSON(GameAssets.HOUSE_MAP, './house/map.json');

    this.load.on('complete', () => {
      this.game.events.emit(GameEventsEnum.BOOT_COMPLETED);
    });
  }
}
