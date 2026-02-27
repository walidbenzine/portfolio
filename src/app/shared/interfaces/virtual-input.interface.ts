import { VirtualInputEnum } from '../enums/virtual-input.enum';

export interface VirtualInputInterface {
  [VirtualInputEnum.DOWN]: boolean;
  [VirtualInputEnum.UP]: boolean;
  [VirtualInputEnum.LEFT]: boolean;
  [VirtualInputEnum.RIGHT]: boolean;
  [VirtualInputEnum.SPACE]: boolean;
}
