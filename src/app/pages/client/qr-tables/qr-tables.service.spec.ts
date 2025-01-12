import { TestBed } from '@angular/core/testing';

import { QrTablesService } from './qr-tables.service';

describe('QrTablesService', () => {
  let service: QrTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
