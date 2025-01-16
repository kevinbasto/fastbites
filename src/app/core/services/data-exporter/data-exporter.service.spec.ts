import { TestBed } from '@angular/core/testing';

import { DataExporterService } from './data-exporter.service';

describe('DataExporterService', () => {
  let service: DataExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
