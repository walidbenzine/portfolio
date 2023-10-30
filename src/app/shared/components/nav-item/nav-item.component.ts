import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'nav-item',
  template: `
      <div class="gravityButton">
        <span class="clickable" (click)="onClickItem()">
          <ng-content></ng-content>
        </span>
    </div>
  `,
})
export class NavItemComponent {

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  onClickItem(): void {
    this.onClick.emit();
  }
}

