import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GravityButtonService {

  subscribeToMouseMove(document: Document): void {
    document.querySelectorAll<HTMLElement>('.gravityButton').forEach(clickableElement => {
      clickableElement.addEventListener('mousemove', (e) => {
        const mouseEvent = e as MouseEvent;
        const rect = clickableElement.getBoundingClientRect();    
        const halfRectWidth = rect.width / 2
        const halfRectHeight = rect.height / 2
        const centerRectX = rect.x + halfRectWidth
        const centerRectY = rect.y + halfRectHeight
        const tx = ( mouseEvent.clientX - centerRectX ) / 4;
        const ty = ( mouseEvent.clientY - centerRectY ) / 4;

        clickableElement.style.setProperty('--tx', `${tx}px`);
        clickableElement.style.setProperty('--ty', `${ty}px`);
      });

      clickableElement.addEventListener('mouseleave', (e) => {
        clickableElement.style.setProperty('--tx', '0px');
        clickableElement.style.setProperty('--ty', '0px');
      });
    })
  }
}
