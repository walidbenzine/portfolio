import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JoystickComponent } from './components/joystick/joystick.component';
import { MenuComponent } from './components/menu/menu.component';
import { JoystickService } from './services/joystick.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JoystickComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly joystickService = inject(JoystickService);
}
