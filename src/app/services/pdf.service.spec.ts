import { TestBed, inject } from '@angular/core/testing';

import { PdfService } from './pdf.service';

describe('PdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfService]
    });
  });

  it('should ...', inject([PdfService], (service: PdfService) => {
    expect(service).toBeTruthy();
  }));
});
