import Phaser from 'phaser';
import { XYInterface } from '../../interfaces/xy.interface';
import { InteractiveZone } from '../../interfaces/interactive-zone.interface';
import {
  emitGameEvent,
  onGameEvent,
  removeGameEventListener,
} from '../../helpers/game-event.helper';
import { GameEventsEnum } from '../../enums/game-events.enum';
import { PlayerConfigInterface } from '../../interfaces/player-config.interface';
import { MapConfigInterface } from '../../interfaces/map-config.interface';
import { LanguageChangedInterface } from '../../interfaces/language-changed.interface';
import { TranslatesEnum } from '../../enums/translates.enum';
import { InitSceneInterface } from '../../interfaces/init-scene.interface';
import { SoundSettingInterface } from '../../interfaces/sound-setting.interface';
import { VirtualInputInterface } from '../../interfaces/virtual-input.interface';
import { VirtualInputEnum } from '../../enums/virtual-input.enum';

const enum PlayerStateEnum {
  IDLE = 'idle',
  WALK = 'walk',
}
const enum PlayerDirectionsEnum {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

enum PlayerAnimationKeys {
  IDLE_DOWN = 'idle_down',
  IDLE_UP = 'idle_up',
  IDLE_LEFT = 'idle_left',
  IDLE_RIGHT = 'idle_right',
  WALK_DOWN = 'walk_down',
  WALK_UP = 'walk_up',
  WALK_LEFT = 'walk_left',
  WALK_RIGHT = 'walk_right',
}

const PLAYER_ANIMS = {
  idle: {
    up: { key: PlayerAnimationKeys.IDLE_UP, frameRate: 16 },
    down: { key: PlayerAnimationKeys.IDLE_DOWN, frameRate: 16 },
    left: { key: PlayerAnimationKeys.IDLE_LEFT, frameRate: 16 },
    right: { key: PlayerAnimationKeys.IDLE_RIGHT, frameRate: 16 },
  },
  walk: {
    up: { key: PlayerAnimationKeys.WALK_UP, frameRate: 12 },
    down: { key: PlayerAnimationKeys.WALK_DOWN, frameRate: 12 },
    left: { key: PlayerAnimationKeys.WALK_LEFT, frameRate: 12 },
    right: { key: PlayerAnimationKeys.WALK_RIGHT, frameRate: 12 },
  },
};

class VirtualInputClass implements VirtualInputInterface {
  [VirtualInputEnum.DOWN] = false;
  [VirtualInputEnum.UP] = false;
  [VirtualInputEnum.LEFT] = false;
  [VirtualInputEnum.RIGHT] = false;
  [VirtualInputEnum.SPACE] = false;
}

export abstract class BaseGameScene extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap;
  private tileset!: Phaser.Tilemaps.Tileset | null;
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private interactKey!: Phaser.Input.Keyboard.Key;
  private interactives!: InteractiveZone[];
  private currentInteractive: InteractiveZone | null = null;
  private isSoundPaused: boolean = false;
  private music!:
    | Phaser.Sound.WebAudioSound
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound;
  private currentDirection: PlayerDirectionsEnum = PlayerDirectionsEnum.DOWN;
  private interactionHint!: Phaser.GameObjects.Text;
  private virtualInput = new VirtualInputClass();
  private previousPlayerPosition!: XYInterface | null;
  private textsMap = new Map<string, string>();
  private textObjects!: Map<string, Phaser.GameObjects.Text>;

  protected abstract readonly mapConfig: MapConfigInterface;
  protected abstract readonly playerConfig: PlayerConfigInterface;

  protected minVisibleWidthCoefficient = 3;
  protected maxVisibleWidthCoefficient = 2;
  protected minVisibleHeightCoefficient = 3;
  protected maxVisibleHeightCoefficient = 2;

  protected init(data: InitSceneInterface): void {
    this.previousPlayerPosition = data.previousPlayerPosition;
    this.textsMap = data.textsMap;
    this.isSoundPaused = data.isSoundPaused;
  }

  preload(): void {
    this.load.image('tiles', this.mapConfig.tilesPath);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.textures.get('tiles')?.setFilter(Phaser.Textures.FilterMode.NEAREST);
    });
    this.load.tilemapTiledJSON('map', this.mapConfig.path);
    this.mapConfig.backgroundMusicPath &&
      this.load.audio('bgMusic', this.mapConfig.backgroundMusicPath);
    Object.values(PlayerAnimationKeys).forEach((animation) => {
      this.load.spritesheet(animation, `./player/${animation}.webp`, {
        frameWidth: 840,
        frameHeight: 720,
      });
    });
  }

  create(): void {
    this.map = this.createMap();
    this.tileset = this.map.addTilesetImage(
      this.mapConfig.tileSetName,
      'tiles',
      this.mapConfig.tileWidth,
      this.mapConfig.tileWidth,
      this.mapConfig.tileMargin ?? 4,
      this.mapConfig.tileSpacing ?? 6,
    );
    this.createGroundLayer();
    this.createDecorationLayer();
    const collisionsLayer = this.createCollisionsLayer();
    this.createTexts();
    this.createPlayer();
    this.createCurors();
    this.createCollisions(collisionsLayer);
    this.createAnimations();
    this.createInteractiveHint();
    this.createInteractives();
    this.createBackgroundMusic();
    this.setBounds();
    this.manageGameEvents();
    this.setReactiveResize();
  }

  private createMap(): Phaser.Tilemaps.Tilemap {
    return this.make.tilemap({
      key: 'map',
      tileWidth: this.mapConfig.tileWidth,
      tileHeight: this.mapConfig.tileHeight,
    });
  }

  private createGroundLayer(): void {
    this.createLayer(this.mapConfig.groundLayerName);
  }

  private createLayer(
    layerName: string | undefined,
  ): Phaser.Tilemaps.TilemapLayer | null {
    if (this.map && this.tileset && layerName) {
      const layer = this.map.createLayer(layerName, this.tileset, 0, 0);

      layer?.setScale(1);
      layer?.setDepth(0);
      layer?.setPipeline('TextureTintPipeline');

      layer?.setOrigin(0, 0);
      layer?.setCullPadding(2, 2);

      return layer;
    }

    return null;
  }

  private createDecorationLayer(): void {
    this.createLayer(this.mapConfig.decorationLayerName);
  }

  private createCollisionsLayer(): Phaser.Tilemaps.TilemapLayer | null {
    return this.createLayer(this.mapConfig.collisionsLayerName);
  }

  private createTexts(): void {
    this.textObjects = new Map<string, Phaser.GameObjects.Text>();
    const textsLayer = this.map.getObjectLayer(this.mapConfig.textsLayerName!);

    textsLayer?.objects.forEach((obj) => {
      if (!obj.text) return;

      const textKey: string = obj.text.text;
      const textObject = this.add.text(
        obj.x!,
        obj.y!,
        this.textsMap?.get(textKey) || textKey,
        {
          fontSize: `${obj.text.pixelsize}px`,
          color: obj.text.color ?? '#000000',
          wordWrap: { width: obj.width },
          fixedWidth: obj.width,
          align: 'center',
          fontFamily: obj.text.fontfamily,
        },
      );

      this.textObjects.set(textKey, textObject);
    });
  }

  private createPlayer(): void {
    this.player = this.physics.add.sprite(
      this.previousPlayerPosition?.x ?? this.playerConfig.initialPosition.x,
      this.previousPlayerPosition?.y ?? this.playerConfig.initialPosition.y,
      'playerIdle',
    );
    this.player.setSize(this.playerConfig.size.x, this.playerConfig.size.y);
    this.player.setOffset(
      this.playerConfig.offset.x,
      this.playerConfig.offset.y,
    );
    this.player.setScale(this.playerConfig.scale || 1);
  }

  private createCurors(): void {
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  private createCollisions(
    collisionsLayer: Phaser.Tilemaps.TilemapLayer | null,
  ): void {
    collisionsLayer?.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, collisionsLayer!);
  }

  private createAnimations(): void {
    Object.entries(PLAYER_ANIMS).forEach(([state, directions]) => {
      Object.entries(directions).forEach(([direction, config]) => {
        this.anims.create({
          key: `${state}_${direction}`,
          frames: this.anims.generateFrameNumbers(config.key),
          frameRate: config.frameRate,
          repeat: -1,
        });
      });
    });
  }

  private createInteractiveHint(): void {
    this.interactionHint = this.add
      .text(0, 0, this.textsMap?.get(TranslatesEnum.INTERACTION_HINT)!, {
        fontSize: '48px',
        color: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 20, y: 20 },
        wordWrap: { width: 700 },
        align: 'center',
      })
      .setOrigin(0.5, -1)
      .setDepth(1000)
      .setVisible(false)
      .setInteractive({ useHandCursor: true });

    this.interactionHint.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const target = pointer.event.target as HTMLElement;

      if (target.tagName !== 'CANVAS') {
        return;
      }

      if (this.currentInteractive) {
        this.triggerInteraction(this.currentInteractive);
      }
    });
  }

  private createInteractives(): void {
    this.interactives = [];
    const interactivesLayer = this.map.getObjectLayer(
      this.mapConfig.interactivesLayerName!,
    );

    interactivesLayer?.objects.forEach((obj) => {
      const zone = this.add.zone(
        obj.x! + obj.width! / 2,
        obj.y! + obj.height! / 2,
        obj.width!,
        obj.height!,
      );

      this.physics.add.existing(zone);
      (zone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      (zone.body as Phaser.Physics.Arcade.Body).setImmovable(true);

      this.interactives.push({
        zone,
        route: obj.properties.find((x: any) => x.name === 'route')?.value,
        dialog: obj.properties.find((x: any) => x.name === 'dialog')?.value,
      });
    });

    this.interactives.forEach((interactive) => {
      this.physics.add.overlap(
        this.player,
        interactive.zone,
        () => this.onEnterInteraction(interactive),
        undefined,
        this,
      );
    });

    this.interactKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
  }

  private onEnterInteraction(interactive: InteractiveZone): void {
    this.currentInteractive = interactive;

    this.interactionHint
      .setPosition(
        interactive.zone.x,
        interactive.zone.y - interactive.zone.height / 2 - 10,
      )
      .setVisible(true);
  }

  private createBackgroundMusic(): void {
    if (this.mapConfig.backgroundMusicPath) {
      this.music = this.sound.add('bgMusic', {
        volume: this.mapConfig.volume ?? 0.5,
        loop: true,
      });
    }
  }

  private setBounds(): void {
    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;

    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

    this.cameras.main.setRoundPixels(true);

    this.cameras.main.startFollow(this.player, true);
  }

  private manageGameEvents(): void {
    onGameEvent(GameEventsEnum.VIRTUAL_INPUT, this.virtualInputHandler);
    onGameEvent(GameEventsEnum.LANGUAGE_CHANGED, this.languageChangedHandler);
    onGameEvent(
      GameEventsEnum.SOUND_SETTING_CHANGED,
      this.soundSettingChangedHandler,
    );

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      removeGameEventListener(
        GameEventsEnum.VIRTUAL_INPUT,
        this.virtualInputHandler,
      );
      removeGameEventListener(
        GameEventsEnum.LANGUAGE_CHANGED,
        this.languageChangedHandler,
      );
      removeGameEventListener(
        GameEventsEnum.SOUND_SETTING_CHANGED,
        this.soundSettingChangedHandler,
      );
    });
  }

  private virtualInputHandler = (e: CustomEvent<VirtualInputClass>) => {
    this.virtualInput = e.detail;
  };

  private languageChangedHandler = (
    e: CustomEvent<LanguageChangedInterface>,
  ) => {
    this.textsMap = e.detail.texts;
    this.updateTexts();
    this.updateInteractionHint();
  };

  private soundSettingChangedHandler = (
    e: CustomEvent<SoundSettingInterface>,
  ) => {
    try {
      if (e.detail.enabled) {
        this.music?.isPaused ? this.music?.resume() : this.music?.play();
      } else {
        this.music?.pause();
      }
    } catch (error: any) {
      console.warn(error);
    }
  };

  private updateTexts(): void {
    if (!this.sys || !this.sys.isActive()) return;

    this.textObjects?.forEach((textObject, key) => {
      if (!textObject || !textObject.scene) return;
      textObject?.setText(this.textsMap?.get(key)!);
    });
  }

  private updateInteractionHint(): void {
    if (!this.sys || !this.sys.isActive()) return;
    this.interactionHint.setText(
      this.textsMap?.get(TranslatesEnum.INTERACTION_HINT)!,
    );
  }

  private setReactiveResize(): void {
    this.scale.on(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    this.handleResize({
      width: this.scale.width,
      height: this.scale.height,
    } as Phaser.Structs.Size);
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const screenWidth = gameSize.width;
    const screenHeight = gameSize.height;

    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;

    const minVisibleWidth = mapWidth / this.minVisibleWidthCoefficient;
    const maxVisibleWidth = mapWidth / this.maxVisibleWidthCoefficient;

    const minVisibleHeight = mapHeight / this.minVisibleHeightCoefficient;
    const maxVisibleHeight = mapHeight / this.maxVisibleHeightCoefficient;

    const visibleWidth = Phaser.Math.Clamp(
      screenWidth,
      minVisibleWidth,
      maxVisibleWidth,
    );

    const visibleHeight = Phaser.Math.Clamp(
      screenHeight,
      minVisibleHeight,
      maxVisibleHeight,
    );

    const zoomX = screenWidth / visibleWidth;
    const zoomY = screenHeight / visibleHeight;

    let zoom = Math.min(zoomX, zoomY);
    zoom = Math.round(zoom * 100) / 100;

    this.cameras.main.setZoom(zoom);
  }

  override update(time: number, delta: number): void {
    this.launchMusic();
    this.managePlayerPositionAndAnimations();
    this.manageInteractions();
    this.manageInteractionHint();
  }

  private launchMusic(): void {
    if (
      this.mapConfig.backgroundMusicPath &&
      !this.music.isPlaying &&
      !this.music.isPaused &&
      !this.isSoundPaused
    ) {
      this.music.play();
    }
  }

  private managePlayerPositionAndAnimations(): void {
    const speed = this.playerConfig.speed ?? 100;

    const left = this.cursors?.left?.isDown || this.virtualInput.left;
    const right = this.cursors?.right?.isDown || this.virtualInput.right;
    const up = this.cursors?.up?.isDown || this.virtualInput.up;
    const down = this.cursors?.down?.isDown || this.virtualInput.down;

    let vx = 0;
    let vy = 0;

    if (left) {
      vx = -speed;
      this.currentDirection = PlayerDirectionsEnum.LEFT;
    } else if (right) {
      vx = speed;
      this.currentDirection = PlayerDirectionsEnum.RIGHT;
    } else if (up) {
      vy = -speed;
      this.currentDirection = PlayerDirectionsEnum.UP;
    } else if (down) {
      vy = speed;
      this.currentDirection = PlayerDirectionsEnum.DOWN;
    }

    this.player.setVelocity(vx, vy);

    const state =
      vx !== 0 || vy !== 0 ? PlayerStateEnum.WALK : PlayerStateEnum.IDLE;

    const animKey = `${state}_${this.currentDirection}`;
    this.player.anims.play(animKey, true);

    this.player.x = Math.round(this.player.x);
    this.player.y = Math.round(this.player.y);

    this.cameras.main.scrollX = Math.round(this.cameras.main.scrollX);
    this.cameras.main.scrollY = Math.round(this.cameras.main.scrollY);
  }

  private manageInteractions(): void {
    if (
      this.currentInteractive &&
      (Phaser.Input.Keyboard.JustDown(this.interactKey) ||
        this.virtualInput.space)
    ) {
      this.triggerInteraction(this.currentInteractive);
    }
  }

  private manageInteractionHint(): void {
    if (this.currentInteractive && this.mapConfig.interactivesLayerName) {
      const dist = Phaser.Math.Distance.Between(
        this.player.body.x,
        this.player.body.y,
        this.currentInteractive.zone.x,
        this.currentInteractive.zone.y,
      );

      if (dist > (this.mapConfig.interactionDistance ?? 50)) {
        this.currentInteractive = null;
        this.interactionHint.setVisible(false);
      }
    }
  }

  private triggerInteraction(interactive: InteractiveZone) {
    if (interactive) {
      emitGameEvent<GameEventsEnum.SAVE_PLAYER_POSITION>(
        GameEventsEnum.SAVE_PLAYER_POSITION,
        { x: this.player.x, y: this.player.y },
      );
      emitGameEvent<GameEventsEnum.ON_INTERACT>(GameEventsEnum.ON_INTERACT, {
        route: interactive.route,
        dialog: interactive.dialog,
      });
      this.virtualInput.space = false;
    }
  }
}
