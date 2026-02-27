import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JoystickComponent } from './core/components/joystick/joystick.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { JoystickService } from './core/services/joystick.service';
import { LoaderComponent } from './core/components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JoystickComponent, MenuComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly joystickService = inject(JoystickService);
}
