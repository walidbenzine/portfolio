import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fadeInOut } from './animations/animation';
import { BlobService } from './shared/services/blob.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ fadeInOut ],
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(
    private blobService: BlobService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.blobService.setBlobDesign(document);
    this.translate.setDefaultLang('fr');
  }
}
