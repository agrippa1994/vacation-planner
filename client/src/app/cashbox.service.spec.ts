import { TestBed } from '@angular/core/testing';

import { CashboxService } from './cashbox.service';

describe('CashboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashboxService = TestBed.get(CashboxService);
    expect(service).toBeTruthy();
  });
});
