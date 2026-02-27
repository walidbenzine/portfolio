import { GenericInteractionsEnum } from '../enums/generic-interactions.enum';
import { RoutesEnum } from '../enums/routes.enum';

export interface OnInteractInterface {
  route?: RoutesEnum;
  dialog?: GenericInteractionsEnum;
}
