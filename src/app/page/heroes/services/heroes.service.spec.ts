import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
