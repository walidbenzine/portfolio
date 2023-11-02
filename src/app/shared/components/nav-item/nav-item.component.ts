import { Component, Input } from "@angular/core";

@Component({
  selector: 'nav-item',
  template: `
      <div class="gravityButton">
        <span class="clickable" [routerLink]="page" routerLinkActive="active">
          {{ page | uppercase }}
        </span>
    </div>
  `,
})
export class NavItemComponent {
  @Input() page: string = '';
}

