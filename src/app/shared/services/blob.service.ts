import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlobService {

  setBlobDesign(document: Document): void {
    const blob = document.getElementById('blob');

    document.body.onpointermove = event => {
      const { clientX, clientY } = event;

      blob?.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, {
        duration: 3000,
        fill: 'forwards'
      });
    }
  }
}
