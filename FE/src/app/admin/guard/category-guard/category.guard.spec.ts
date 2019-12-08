import { TestBed } from '@angular/core/testing';

import { CategoryGuard } from './category.guard';

describe('CategoryGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const Guard: CategoryGuard = TestBed.get(CategoryGuard);
    expect(Guard).toBeTruthy();
  });
});
