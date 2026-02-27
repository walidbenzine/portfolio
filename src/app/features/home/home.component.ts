import { Component } from '@angular/core';
import { BaseGameComponent } from '../../shared/components/base/base-game.component';
import { BaseGameService } from '../../shared/components/base/base-game.service';
import { ScenesEnum } from '../../shared/enums/scenes.enum';
import { TranslatesEnum } from '../../shared/enums/translates.enum';
import { HomeGameService } from './home-game.service';
import { HomeGameScene } from './home-game-scene';
import { GenericTextReplacementEnum } from '../../shared/enums/generic-text-replacement.enum';

@Component({
  selector: 'app-home',
  template: `<div id="home-game-container"></div>`,
  providers: [{ provide: BaseGameService, useExisting: HomeGameService }],
})
export class HomeComponent extends BaseGameComponent {
  protected readonly gameScene = HomeGameScene;
  protected readonly scenesEnum = ScenesEnum.HOME;
  protected readonly mapWidth: number = 5120;
  protected readonly mapHeight: number = 2560;
  protected readonly gameContainer: string = 'home-game-container';

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
