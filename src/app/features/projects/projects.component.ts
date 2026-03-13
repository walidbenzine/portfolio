import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { GenericTextReplacementEnum } from '../../shared/enums/generic-text-replacement.enum';
import { GenericInteractionsEnum } from '../../shared/enums/generic-interactions.enum';
import { DialogComponentConfigInterface } from '../../shared/interfaces/dialog-component-config.interface';
import { ScenesEnum } from '../../shared/enums/scenes.enum';
import { ProjectsGameService } from './projects-game.service';
import { BasePlayerPositionService } from '../../shared/components/base/base-player-position.service';
import { BaseGameHouseComponent } from '../../shared/components/base/base-game-house.component';
import { EasyPathComponent } from './dialogs/easy-path/easy-path.component';
import { TmdbComponent } from './dialogs/tmdb/tmdb.component';
import { VoisinMalinComponent } from './dialogs/voisin-malin/voisin-malin.component';
import { JavaRmiComponent } from './dialogs/java-rmi/java-rmi.component';
import { BaseGameHouseScene } from '../../shared/components/base/base-game-house-scene';

@Component({
  selector: 'app-projects',
  template: ``,
  providers: [
    { provide: BasePlayerPositionService, useExisting: ProjectsGameService },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent extends BaseGameHouseComponent {
  protected readonly gameScene = BaseGameHouseScene;
  protected readonly scenesEnum = ScenesEnum.PROJECTS;

  protected dialogMap = new Map<
    GenericInteractionsEnum,
    DialogComponentConfigInterface
  >([
    [GenericInteractionsEnum.INTERACTION1, { component: VoisinMalinComponent }],
    [GenericInteractionsEnum.INTERACTION2, { component: TmdbComponent }],
    [GenericInteractionsEnum.INTERACTION3, { component: JavaRmiComponent }],
    [GenericInteractionsEnum.INTERACTION4, { component: EasyPathComponent }],
  ]);

  protected override getTextsList(): TranslatesEnum[] {
    return [
      ...super.getTextsList(),
      TranslatesEnum.EASY_PATH,
      TranslatesEnum.TMDB,
      TranslatesEnum.VOISIN_MALIN,
      TranslatesEnum.JAVA_RMI,
    ];
  }

  protected getTextsRemplacements(): Map<
    TranslatesEnum,
    GenericTextReplacementEnum
  > {
    return new Map<TranslatesEnum, GenericTextReplacementEnum>([
      [TranslatesEnum.VOISIN_MALIN, GenericTextReplacementEnum.TEXT1],
      [TranslatesEnum.TMDB, GenericTextReplacementEnum.TEXT2],
      [TranslatesEnum.JAVA_RMI, GenericTextReplacementEnum.TEXT3],
      [TranslatesEnum.EASY_PATH, GenericTextReplacementEnum.TEXT4],
    ]);
  }
}
