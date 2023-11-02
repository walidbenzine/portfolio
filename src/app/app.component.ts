import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.blobService.setBlobDesign(document);
  }
}
