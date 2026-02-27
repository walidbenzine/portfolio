import { TranslatesEnum } from '../enums/translates.enum';
import { XYInterface } from './xy.interface';

export interface InitSceneInterface {
  textsMap: Map<TranslatesEnum, string>;
  previousPlayerPosition: XYInterface;
  isSoundPaused: boolean;
}
