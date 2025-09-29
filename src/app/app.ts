import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './layout/menu/menu';
import { CommonModule } from '@angular/common';
import { Logo } from "./layout/logo/logo";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu, CommonModule, Logo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('meuga-frontend');
}
