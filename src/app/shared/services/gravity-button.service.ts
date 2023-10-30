import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GravityButtonService {

  subscribeToMouseMove(document: Document): void {
    document.querySelectorAll<HTMLElement>('.gravityButton').forEach(clickableElement => {
      clickableElement.addEventListener('mousemove', (e) => {
        const mouseEvent = e as MouseEvent;
        const rect = clickableElement.getBoundingClientRect();    
        const h = rect.width / 2;
        
        const x = mouseEvent.clientX - rect.left - h;
        const y = mouseEvent.clientY - rect.top - h;
    
        const r1 = Math.sqrt(x*x+y*y);
        const r2 = (1 - (r1 / h)) * r1;
    
        const angle = Math.atan2(y, x);
        const tx = Math.round(Math.cos(angle) * r2 * 100) / 100;
        const ty = Math.round(Math.sin(angle) * r2 * 100) / 100;

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
