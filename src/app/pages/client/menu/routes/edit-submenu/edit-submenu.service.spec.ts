import { TestBed } from '@angular/core/testing';

import { EditSubmenuService } from './edit-submenu.service';

describe('EditSubmenuService', () => {
  let service: EditSubmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSubmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
