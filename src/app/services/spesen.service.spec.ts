import { TestBed, inject } from '@angular/core/testing';

import { SpesenService } from './spesen.service';

describe('SpesenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpesenService]
    });
  });

  it('should ...', inject([SpesenService], (service: SpesenService) => {
    expect(service).toBeTruthy();
  }));
});
