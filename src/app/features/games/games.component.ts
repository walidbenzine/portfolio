import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseGameHouseComponent } from '../../shared/components/base/base-game-house.component';
import { ScenesEnum } from '../../shared/enums/scenes.enum';
import { GenericInteractionsEnum } from '../../shared/enums/generic-interactions.enum';
import { BasePlayerPositionService } from '../../shared/components/base/base-player-position.service';
import { GamesGameService } from './games-game.service';
import { DialogComponentConfigInterface } from '../../shared/interfaces/dialog-component-config.interface';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { GenericTextReplacementEnum } from '../../shared/enums/generic-text-replacement.enum';
import { CrackTheCodeComponent } from './dialogs/crack-the-code/crack-the-code.component';
import { GuessTheNumberComponent } from './dialogs/guess-the-number/guess-the-number.component';
import { MemoryComponent } from './dialogs/memory/memory.component';
import { BaseGameHouseScene } from '../../shared/components/base/base-game-house-scene';

@Component({
  selector: 'app-games',
  template: ``,
  providers: [
    { provide: BasePlayerPositionService, useExisting: GamesGameService },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent extends BaseGameHouseComponent {
  protected readonly gameScene = BaseGameHouseScene;
  protected readonly scenesEnum = ScenesEnum.GAMES;

  protected dialogMap = new Map<
    GenericInteractionsEnum,
    DialogComponentConfigInterface
  >([
    [
      GenericInteractionsEnum.INTERACTION1,
      { component: CrackTheCodeComponent },
    ],
    [
      GenericInteractionsEnum.INTERACTION2,
      { component: GuessTheNumberComponent },
    ],
    [GenericInteractionsEnum.INTERACTION3, { component: MemoryComponent }],
    // [GenericInteractionsEnum.INTERACTION4, { component: UboComponent }],
  ]);

  protected override getTextsList(): TranslatesEnum[] {
    return [
      ...super.getTextsList(),
      TranslatesEnum.CRACK_THE_CODE,
      TranslatesEnum.GUESS_THE_NUMBER,
      TranslatesEnum.MEMORY,
    ];
  }

  protected getTextsRemplacements(): Map<
    TranslatesEnum,
    GenericTextReplacementEnum
  > {
    return new Map<TranslatesEnum, GenericTextReplacementEnum>([
      [TranslatesEnum.CRACK_THE_CODE, GenericTextReplacementEnum.TEXT1],
      [TranslatesEnum.GUESS_THE_NUMBER, GenericTextReplacementEnum.TEXT2],
      [TranslatesEnum.MEMORY, GenericTextReplacementEnum.TEXT3],
      // [TranslatesEnum.UBO, GenericTextReplacementEnum.TEXT4],
    ]);
  }
}
