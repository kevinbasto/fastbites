import { TestBed } from '@angular/core/testing';

import { EditImageService } from './edit-image.service';

describe('EditImageService', () => {
  let service: EditImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
