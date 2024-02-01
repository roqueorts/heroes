import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { HeroesListComponent } from '../heroes-list/heroes-list.component';

@Component({
  selector: 'app-heroes-page',
  standalone: true,
  imports: [HeroesListComponent],
  providers: [DecimalPipe],
  templateUrl: './heroes-page.component.html',
  styleUrl: './heroes-page.component.scss'
})
export class HeroesPageComponent {

  constructor() { }
}



