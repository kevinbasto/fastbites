import { TestBed } from '@angular/core/testing';

import { CreateSubmenuService } from './create-submenu.service';

describe('CreateSubmenuService', () => {
  let service: CreateSubmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSubmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
