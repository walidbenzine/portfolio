import { VirtualInputEnum } from '../enums/virtual-input.enum';
import { VirtualInputInterface } from '../interfaces/virtual-input.interface';

export class VirtualInputClass implements VirtualInputInterface {
  [VirtualInputEnum.DOWN] = false;
  [VirtualInputEnum.UP] = false;
  [VirtualInputEnum.LEFT] = false;
  [VirtualInputEnum.RIGHT] = false;
  [VirtualInputEnum.SPACE] = false;
}
