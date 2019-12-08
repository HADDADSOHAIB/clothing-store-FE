import { TestBed } from '@angular/core/testing';

import { ProductGuard} from './product.guard';

describe('AddProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductGuard= TestBed.get(ProductGuard);
    expect(service).toBeTruthy();
  });
});
