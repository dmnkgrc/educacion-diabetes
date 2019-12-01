import { TestBed, async, inject } from '@angular/core/testing';

import { InsulinGuard } from './insulin.guard';

describe('InsulinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsulinGuard],
    });
  });

  it('should ...', inject([InsulinGuard], (guard: InsulinGuard) => {
    expect(guard).toBeTruthy();
  }));
});
