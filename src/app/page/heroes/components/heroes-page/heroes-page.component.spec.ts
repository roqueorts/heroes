import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from '../../../../app.routes';
import { HeroesPageComponent } from './heroes-page.component';

describe('HeroesPageComponent', () => {
  let component: HeroesPageComponent;
  let fixture: ComponentFixture<HeroesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesPageComponent, HttpClientModule],
      providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideStore(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
