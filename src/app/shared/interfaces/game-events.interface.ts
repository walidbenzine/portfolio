import { GameEventsEnum } from '../enums/game-events.enum';
import { OnInteractInterface } from './on-interact.interface';
import { XYInterface } from './xy.interface';
import { VirtualInputInterface } from './virtual-input.interface';
import { LanguageChangedInterface } from './language-changed.interface';
import { SoundSettingInterface } from './sound-setting.interface';

export interface GameEventMap {
  [GameEventsEnum.VIRTUAL_INPUT]: VirtualInputInterface;
  [GameEventsEnum.ON_INTERACT]: OnInteractInterface;
  [GameEventsEnum.SAVE_PLAYER_POSITION]: XYInterface;
  [GameEventsEnum.LANGUAGE_CHANGED]: LanguageChangedInterface;
  [GameEventsEnum.SOUND_SETTING_CHANGED]: SoundSettingInterface;
}
