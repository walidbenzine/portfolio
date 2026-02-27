import { XYInterface } from './xy.interface';

export interface PlayerConfigInterface {
  size: XYInterface;
  offset: XYInterface;
  initialPosition: XYInterface;
  speed?: number;
  scale?: number;
}
