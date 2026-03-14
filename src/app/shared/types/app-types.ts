import {
  MaxLengthValidationError,
  MinLengthValidationError,
  ValidationError,
} from '@angular/forms/signals';
import { VirtualInputEnum } from '../enums/virtual-input.enum';

export type ThemeMode = 'light' | 'dark' | 'system';

export type Direction =
  | 'center'
  | VirtualInputEnum.LEFT
  | VirtualInputEnum.RIGHT
  | VirtualInputEnum.UP
  | VirtualInputEnum.DOWN;

export type AppError =
  | ValidationError
  | MinLengthValidationError
  | MaxLengthValidationError;

export type InputTypes = 'text' | 'email' | 'number' | 'textarea';
