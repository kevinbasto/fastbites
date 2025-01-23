import { TestBed } from '@angular/core/testing';

import { ImagesRepoService } from './images-repo.service';

describe('ImagesRepoService', () => {
  let service: ImagesRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
