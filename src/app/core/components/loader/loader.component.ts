import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { BaseTranslationsComponent } from '../../../shared/components/base/base-translations.component';
import { TranslatesEnum } from '../../../shared/enums/translates.enum';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent extends BaseTranslationsComponent {
  readonly loaderService = inject(LoaderService);

  protected getTextsList(): TranslatesEnum[] {
    return [TranslatesEnum.LOADING];
  }
}
