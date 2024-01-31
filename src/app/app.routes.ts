import { Routes } from '@angular/router';
import { HeroesAddComponent } from './page/heroes/components/heroes-add/heroes-add.component';
import { HeroesPageComponent } from './page/heroes/components/heroes-page/heroes-page.component';

export const routes: Routes = [
    { path: 'home', component: HeroesPageComponent },
    { path: 'edit-heroe/:id', component: HeroesAddComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
