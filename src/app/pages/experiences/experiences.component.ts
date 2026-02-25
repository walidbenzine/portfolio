import { Component } from '@angular/core';
import { TranslatesEnum } from '../../enums/translates.enum';
import { ScenesEnum } from '../../enums/scenes.enum';
import { BaseGameService } from '../../base/base-game.service';
import { GenericInteractionsEnum } from '../../enums/generic-interactions.enum';
import { GenericTextReplacementEnum } from '../../enums/generic-text-replacement.enum';
import { BaseGameHouseComponent } from '../../base/base-game-house.component';
import { DialogComponentConfigInterface } from '../../interfaces/dialog-component-config.interface';
import { ExperiencesGameService } from './experiences-game.service';
import { ExperiencesGameScene } from './experiences-game.scene';
import { ViverisComponent } from './dialogs/viveris/viveris.component';
import { CapgeminiComponent } from './dialogs/capgemini/capgemini.component';
import { NfgComponent } from './dialogs/nfg/nfg.component';
import { AlgerieTelecomComponent } from './dialogs/algerie-telecom/algerie-telecom.component';

@Component({
  selector: 'app-experiences',
  template: `<div id="experiences-game-container"></div>`,
  providers: [
    { provide: BaseGameService, useExisting: ExperiencesGameService },
  ],
})
export class ExperiencesComponent extends BaseGameHouseComponent {
  protected readonly gameScene = new ExperiencesGameScene();
  protected readonly scenesEnum = ScenesEnum.EXPERIENCES;
  protected readonly mapWidth: number = 3840;
  protected readonly mapHeight: number = 2560;
  protected readonly gameContainer: string = 'experiences-game-container';

  protected dialogMap = new Map<
    GenericInteractionsEnum,
    DialogComponentConfigInterface
  >([
    [
      GenericInteractionsEnum.INTERACTION1,
      { component: AlgerieTelecomComponent },
    ],
    [GenericInteractionsEnum.INTERACTION2, { component: CapgeminiComponent }],
    [GenericInteractionsEnum.INTERACTION3, { component: NfgComponent }],
    [GenericInteractionsEnum.INTERACTION4, { component: ViverisComponent }],
  ]);

  protected override getTextsList(): TranslatesEnum[] {
    return [
      ...super.getTextsList(),
      TranslatesEnum.ALGERIE_TELECOM,
      TranslatesEnum.CAPGEMINI,
      TranslatesEnum.NFG,
      TranslatesEnum.VIVERIS,
      TranslatesEnum.EXIT,
    ];
  }

  protected getTextsRemplacements(): Map<
    TranslatesEnum,
    GenericTextReplacementEnum
  > {
    return new Map<TranslatesEnum, GenericTextReplacementEnum>([
      [TranslatesEnum.ALGERIE_TELECOM, GenericTextReplacementEnum.TEXT1],
      [TranslatesEnum.CAPGEMINI, GenericTextReplacementEnum.TEXT2],
      [TranslatesEnum.NFG, GenericTextReplacementEnum.TEXT3],
      [TranslatesEnum.VIVERIS, GenericTextReplacementEnum.TEXT4],
    ]);
  }
}
