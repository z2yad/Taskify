import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZardToastComponent } from "./shared/components/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ZardToastComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Advanced-Todo');
}
