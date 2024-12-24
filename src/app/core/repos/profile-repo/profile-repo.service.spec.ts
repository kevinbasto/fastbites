import { TestBed } from '@angular/core/testing';

import { ProfileRepoService } from './profile-repo.service';

describe('ProfileRepoService', () => {
  let service: ProfileRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
