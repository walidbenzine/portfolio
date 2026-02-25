import { GameEventsEnum } from '../enums/game-events.enum';
import { OnInteractInterface } from '../interfaces/on-interact.interface';
import { XYInterface } from '../interfaces/xy.interface';
import { VirtualInputInterface } from '../interfaces/virtual-input.interface';
import { LanguageChangedInterface } from '../interfaces/language-changed.interface';
import { SoundSettingInterface } from '../interfaces/sound-setting.interface';

export interface GameEventMap {
  [GameEventsEnum.VIRTUAL_INPUT]: VirtualInputInterface;
  [GameEventsEnum.ON_INTERACT]: OnInteractInterface;
  [GameEventsEnum.SAVE_PLAYER_POSITION]: XYInterface;
  [GameEventsEnum.LANGUAGE_CHANGED]: LanguageChangedInterface;
  [GameEventsEnum.SOUND_SETTING_CHANGED]: SoundSettingInterface;
}
