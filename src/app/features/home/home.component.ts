import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseGameComponent } from '../../shared/components/base/base-game.component';
import { BasePlayerPositionService } from '../../shared/components/base/base-player-position.service';
import { ScenesEnum } from '../../shared/enums/scenes.enum';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { HomeGameService } from './home-game.service';
import { HomeGameScene } from './home-game-scene';
import { GenericTextReplacementEnum } from '../../shared/enums/generic-text-replacement.enum';

@Component({
  selector: 'app-home',
  template: ``,
  providers: [
    { provide: BasePlayerPositionService, useExisting: HomeGameService },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends BaseGameComponent {
  protected readonly gameScene = HomeGameScene;
  protected readonly scenesEnum = ScenesEnum.HOME;

  protected override getTextsList(): TranslatesEnum[] {
    return [
      ...super.getTextsList(),
      TranslatesEnum.CONTACT,
      TranslatesEnum.HOME,
      TranslatesEnum.PROJECTS,
      TranslatesEnum.FORMS,
      TranslatesEnum.EXPERIENCES,
      TranslatesEnum.GAMES,
    ];
  }

  protected getTextsRemplacements(): Map<
    TranslatesEnum,
    GenericTextReplacementEnum
  > {
    return new Map<TranslatesEnum, GenericTextReplacementEnum>();
  }
}
