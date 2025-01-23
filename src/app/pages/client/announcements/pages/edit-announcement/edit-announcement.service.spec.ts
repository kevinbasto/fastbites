import { TestBed } from '@angular/core/testing';

import { EditAnnouncementService } from './edit-announcement.service';

describe('EditAnnouncementService', () => {
  let service: EditAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
