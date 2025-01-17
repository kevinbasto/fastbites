import { TestBed } from '@angular/core/testing';

import { EditGroupService } from './edit-group.service';

describe('EditGroupService', () => {
  let service: EditGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
