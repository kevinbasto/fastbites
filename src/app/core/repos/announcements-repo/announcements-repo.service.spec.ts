import { TestBed } from '@angular/core/testing';

import { AnnouncementsRepoService } from './announcements-repo.service';

describe('AnnouncementsRepoService', () => {
  let service: AnnouncementsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
