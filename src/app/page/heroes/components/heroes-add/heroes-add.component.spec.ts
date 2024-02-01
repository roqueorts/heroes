import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from '../../../../app.routes';
import { HeroesAddComponent } from './heroes-add.component';

describe('HeroesAddComponent', () => {
  let component: HeroesAddComponent;
  let fixture: ComponentFixture<HeroesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesAddComponent, HttpClientModule],
      providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideStore(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
