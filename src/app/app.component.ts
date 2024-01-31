import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesPageComponent } from "./page/heroes/components/heroes-page/heroes-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, HeroesPageComponent]
})
export class AppComponent {
  title = 'Lista de héroes';

  constructor() { };

}




