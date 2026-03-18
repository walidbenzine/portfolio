import { TranslatesEnum } from '../enums/translates.enum';

export interface StepTour {
  id: string;
  title?: TranslatesEnum;
  attachTo: {
    element: string;
    on?: string;
  };
  arrow?: {
    padding: number;
  };
  beforeShowPromise?: () => Promise<any>;
  buttons?: {
    classes?: string;
    secondary?: boolean;
    text: TranslatesEnum;
    type: 'next' | 'back';
  }[];
  text: TranslatesEnum[];
  when?: {
    show?: () => void;
    hide?: () => void;
  };
}
