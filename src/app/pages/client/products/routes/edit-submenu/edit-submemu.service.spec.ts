import { TestBed } from '@angular/core/testing';

import { EditSubmemuService } from './edit-submemu.service';

describe('EditSubmemuService', () => {
  let service: EditSubmemuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSubmemuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
