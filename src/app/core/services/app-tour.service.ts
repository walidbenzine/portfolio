import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { StorageService } from './storage.service';
import { StorageEnum } from '../../shared/enums/storage.enum';
import { LanguageService } from './language.service';
import { JoystickService } from './joystick.service';
import { MenuService } from './menu.service';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { StepTour } from '../../shared/interfaces/step-tour.interface';

@Injectable({ providedIn: 'root' })
export class AppTourService {
  private readonly shepherdService = inject(ShepherdService);
  private readonly storageService = inject(StorageService);
  private readonly languageService = inject(LanguageService);
  private readonly joystickService = inject(JoystickService);
  private readonly menuService = inject(MenuService);

  private readonly _isTourActive = signal<boolean>(false);
  readonly isTourActive = this._isTourActive.asReadonly();

  private readonly steps: StepTour[] = [
    {
      id: 'step1',
      title: TranslatesEnum.TOUR_STEP1_TITLE,
      attachTo: {
        element: '.selectors',
        on: 'auto',
      },
      beforeShowPromise: async () => {
        await this.menuService.open();
        this.joystickService.setVisibility(false);
      },
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: TranslatesEnum.NEXT,
          type: 'next',
        },
      ],
      text: [
        TranslatesEnum.TOUR_STEP1_TEXT1,
        TranslatesEnum.TOUR_STEP1_TEXT2,
        TranslatesEnum.TOUR_STEP1_TEXT3,
      ],
    },
    {
      id: 'step2',
      attachTo: {
        element: '.routes',
        on: 'auto',
      },
      title: TranslatesEnum.TOUR_STEP2_TITLE,
      beforeShowPromise: async () => {
        await this.menuService.open();
        this.joystickService.setVisibility(false);
      },
      buttons: [
        {
          secondary: true,
          text: TranslatesEnum.PREVIOUS,
          type: 'back',
        },
        {
          classes: 'shepherd-button-primary',
          text: TranslatesEnum.NEXT,
          type: 'next',
        },
      ],
      text: [TranslatesEnum.TOUR_STEP2_TEXT1, TranslatesEnum.TOUR_STEP2_TEXT2],
    },
    {
      id: 'step3',
      attachTo: {
        element: '.gameSound',
        on: 'auto',
      },
      title: TranslatesEnum.TOUR_STEP3_TITLE,
      beforeShowPromise: async () => {
        await this.menuService.open();
        this.joystickService.setVisibility(false);
      },
      buttons: [
        {
          secondary: true,
          text: TranslatesEnum.PREVIOUS,
          type: 'back',
        },
        {
          classes: 'shepherd-button-primary',
          text: TranslatesEnum.NEXT,
          type: 'next',
        },
      ],
      text: [TranslatesEnum.TOUR_STEP3_TEXT1, TranslatesEnum.TOUR_STEP3_TEXT2],
    },
    {
      id: 'step4',
      attachTo: {
        element: '.joystick',
        on: 'auto',
      },
      title: TranslatesEnum.TOUR_STEP4_TITLE,
      beforeShowPromise: async () => {
        this.joystickService.setVisibility(true);
        await this.menuService.close();
      },
      buttons: [
        {
          secondary: true,
          text: TranslatesEnum.PREVIOUS,
          type: 'back',
        },
        {
          classes: 'shepherd-button-primary',
          text: TranslatesEnum.CLOSE,
          type: 'next',
        },
      ],
      text: [TranslatesEnum.TOUR_STEP4_TEXT1, TranslatesEnum.TOUR_STEP4_TEXT2],
    },
  ];

  constructor() {
    effect(() => {
      this.languageService.getLanguage();

      untracked(() => {
        if (!this.isTourActive()) return;
        this.restartTour();
      });
    });
  }

  private restartTour(): void {
    const tour = this.shepherdService.tourObject;

    if (!tour) {
      this.startTour();
      return;
    }

    tour.once('cancel', () => {
      this.shepherdService.tourObject = null;
      this.startTour();
    });

    tour.cancel();
  }

  async startTour(): Promise<void> {
    if (this.storageService.getItem<boolean>(StorageEnum.APP_TOUR_DONE)) {
      return;
    }

    this._isTourActive.set(true);
    this.setDefaultStepOptions();
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.addTourSteps();
    this.onCompleteTour();
    this.shepherdService.start();
  }

  private setDefaultStepOptions(): void {
    this.shepherdService.defaultStepOptions = {
      classes: 'appTour',
      scrollTo: false,
      cancelIcon: {
        enabled: false,
      },
      highlightClass: 'highlight',
    };
  }

  private addTourSteps(): void {
    this.shepherdService.addSteps(
      this.steps.map((step) => this.mapStepOptions(step)),
    );
  }

  private mapStepOptions(step: StepTour): any {
    return {
      ...step,
      text: step.text
        ?.map((t) => this.languageService.getTranslation(t)())
        .join('<br><br>'),
      title: this.languageService.getTranslation(
        step.title ?? TranslatesEnum.TOUR_DEFAULT_TITLE,
      )(),
      buttons: step.buttons?.map((btn) => {
        return {
          ...btn,
          text: this.languageService.getTranslation(btn.text)(),
        };
      }),
    } as any;
  }

  private onCompleteTour(): void {
    this.shepherdService.tourObject?.on('complete', () => {
      this.storageService.setItem(StorageEnum.APP_TOUR_DONE, true);
      this._isTourActive.set(false);
    });
  }
}
