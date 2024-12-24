import { TestBed } from '@angular/core/testing';

import { CardsRepoService } from './cards-repo.service';

describe('CardsRepoService', () => {
  let service: CardsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
