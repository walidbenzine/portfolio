import { Component } from '@angular/core';
import { TranslatesEnum } from '../../enums/translates.enum';
import { ScenesEnum } from '../../enums/scenes.enum';
import { BaseGameService } from '../../base/base-game.service';
import { FormsGameService } from './forms-game.service';
import { FormsGameScene } from './forms-game-scene';
import { GenericInteractionsEnum } from '../../enums/generic-interactions.enum';
import { GenericTextReplacementEnum } from '../../enums/generic-text-replacement.enum';
import { UpemComponent } from './dialogs/upem/upem.component';
import { BaseGameHouseComponent } from '../../base/base-game-house.component';
import { DialogComponentConfigInterface } from '../../interfaces/dialog-component-config.interface';
import { UboComponent } from './dialogs/ubo/ubo.component';
import { Usthb2Component } from './dialogs/usthb2/usthb2.component';
import { Usthb1Component } from './dialogs/usthb1/usthb1.component';

@Component({
  selector: 'app-forms',
  template: `<div id="forms-game-container"></div>`,
  providers: [{ provide: BaseGameService, useExisting: FormsGameService }],
})
export class FormsComponent extends BaseGameHouseComponent {
  protected readonly gameScene = new FormsGameScene();
  protected readonly scenesEnum = ScenesEnum.FORMS;
  protected readonly mapWidth: number = 3840;
  protected readonly mapHeight: number = 2560;
  protected readonly gameContainer: string = 'forms-game-container';

  protected dialogMap = new Map<
    GenericInteractionsEnum,
    DialogComponentConfigInterface
  >([
    [GenericInteractionsEnum.INTERACTION1, { component: Usthb1Component }],
    [GenericInteractionsEnum.INTERACTION2, { component: UpemComponent }],
    [GenericInteractionsEnum.INTERACTION3, { component: Usthb2Component }],
    [GenericInteractionsEnum.INTERACTION4, { component: UboComponent }],
  ]);

  protected override getTextsList(): TranslatesEnum[] {
    return [
      ...super.getTextsList(),
      TranslatesEnum.USTHB1,
      TranslatesEnum.USTHB2,
      TranslatesEnum.UBO,
      TranslatesEnum.UPEM,
      TranslatesEnum.EXIT,
    ];
  }

  protected getTextsRemplacements(): Map<
    TranslatesEnum,
    GenericTextReplacementEnum
  > {
    return new Map<TranslatesEnum, GenericTextReplacementEnum>([
      [TranslatesEnum.USTHB1, GenericTextReplacementEnum.TEXT1],
      [TranslatesEnum.UPEM, GenericTextReplacementEnum.TEXT2],
      [TranslatesEnum.USTHB2, GenericTextReplacementEnum.TEXT3],
      [TranslatesEnum.UBO, GenericTextReplacementEnum.TEXT4],
    ]);
  }
}
