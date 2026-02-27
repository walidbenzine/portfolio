import { Component } from '@angular/core';
import { BaseGameHouseComponent } from '../../shared/components/base/base-game-house.component';
import { GamesGameScene } from './games-game.scene';
import { ScenesEnum } from '../../shared/enums/scenes.enum';
import { GenericInteractionsEnum } from '../../shared/enums/generic-interactions.enum';
import { BaseGameService } from '../../shared/components/base/base-game.service';
import { GamesGameService } from './games-game.service';
import { DialogComponentConfigInterface } from '../../shared/interfaces/dialog-component-config.interface';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { GenericTextReplacementEnum } from '../../shared/enums/generic-text-replacement.enum';
import { CrackTheCodeComponent } from './dialogs/crack-the-code/crack-the-code.component';

@Component({
  selector: 'app-games',
  template: `<div id="games-game-container"></div>`,
  providers: [{ provide: BaseGameService, useExisting: GamesGameService }],
})
export class GamesComponent extends BaseGameHouseComponent {
  protected readonly gameScene = GamesGameScene;
  protected readonly scenesEnum = ScenesEnum.GAMES;
  protected readonly mapWidth: number = 3840;
  protected readonly mapHeight: number = 2560;
  protected readonly gameContainer: string = 'games-game-container';

  protected dialogMap = new Map<
    GenericInteractionsEnum,
    DialogComponentConfigInterface
  >([
    [
      GenericInteractionsEnum.INTERACTION1,
      { component: CrackTheCodeComponent },
    ],
    // [GenericInteractionsEnum.INTERACTION2, { component: UpemComponent }],
    // [GenericInteractionsEnum.INTERACTION3, { component: Usthb2Component }],
    // [GenericInteractionsEnum.INTERACTION4, { component: UboComponent }],
  ]);

  protected override getTextsList(): TranslatesEnum[] {
    return [...super.getTextsList(), TranslatesEnum.CRACK_THE_CODE];
  }

  protected getTextsRemplacements(): Map<
    TranslatesEnum,
    GenericTextReplacementEnum
  > {
    return new Map<TranslatesEnum, GenericTextReplacementEnum>([
      [TranslatesEnum.CRACK_THE_CODE, GenericTextReplacementEnum.TEXT1],
      // [TranslatesEnum.UPEM, GenericTextReplacementEnum.TEXT2],
      // [TranslatesEnum.USTHB2, GenericTextReplacementEnum.TEXT3],
      // [TranslatesEnum.UBO, GenericTextReplacementEnum.TEXT4],
    ]);
  }
}
