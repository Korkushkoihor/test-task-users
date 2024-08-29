import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TooltipsComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TooltipsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
