import { GenericInteractionsEnum } from '../enums/generic-interactions.enum';
import { RoutesEnum } from '../enums/routes.enum';

export interface InteractiveZone {
  zone: Phaser.GameObjects.Zone;
  route?: RoutesEnum;
  dialog?: GenericInteractionsEnum;
}
