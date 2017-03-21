import { TestBed, inject } from '@angular/core/testing';

import { BillServiceService } from './bill-service.service';

describe('BillServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillServiceService]
    });
  });

  it('should ...', inject([BillServiceService], (service: BillServiceService) => {
    expect(service).toBeTruthy();
  }));
});
