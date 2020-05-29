import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BACK_END } from 'backend';
import { take, switchMap, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Options } from 'src/app/models/options';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  options: BehaviorSubject<any> = new BehaviorSubject({});
  
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(BACK_END + 'products').pipe(map((res) => this.processProducts(res))) as Observable<any>;
  }

  getProduct(id: number) {
    return this.httpClient.get(BACK_END + `products/${id}`) as Observable<any>;
  }

  createProduct(product: Product) {
    return this.httpClient.post(BACK_END + 'products', product) as Observable<any>;
  }

  private processProducts(res) {
    return res.data.map(
      (pr) =>
        new Product(
          pr.id,
          pr.name,
          pr.description,
          pr.price,
          [],
          Math.round(pr.rating * 100) / 100,
          [],
          [],
          pr.quantity
        )
    );
  }
}
