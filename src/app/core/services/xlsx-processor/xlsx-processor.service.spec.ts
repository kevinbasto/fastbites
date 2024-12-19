import { TestBed } from '@angular/core/testing';

import { XlsxProcessorService } from './xlsx-processor.service';

describe('XlsxProcessorService', () => {
  let service: XlsxProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlsxProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
