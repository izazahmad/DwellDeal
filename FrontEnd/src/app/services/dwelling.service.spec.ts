import { TestBed } from '@angular/core/testing';

import { DwellingService } from './dwelling.service';

describe('DwellingService', () => {
  let service: DwellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DwellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
