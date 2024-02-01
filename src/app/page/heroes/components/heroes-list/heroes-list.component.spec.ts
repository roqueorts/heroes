import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from '../../../../app.routes';
import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesListComponent, HttpClientModule],
      providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideStore(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should count heroes added', () => {

    // expect(component.dataSource.data.length).toEqual(10);
    expect(component.count).toEqual(0);
  });
});
