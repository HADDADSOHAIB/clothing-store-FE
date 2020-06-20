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
  options: BehaviorSubject<Options> = new BehaviorSubject(new Options('', [0, Infinity], ['', ''], [], 1, 10));

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.options.pipe(
      switchMap((options) => {
        return this.httpClient
          .get(BACK_END + `products?${this.queryBuilder(options)}`)
          .pipe(map((res) => this.processProducts(res)));
      })
    ) as Observable<Product[]>;
  }

  getCount() {
    return this.httpClient.get(BACK_END + `products/count`) as Observable<any>;
  }

  getProduct(id: number) {
    return this.httpClient.get(BACK_END + `products/${id}`)
      .pipe(map(res => this.processProduct(res['data']))) as Observable<Product>;
  }

  createOrUpdateProduct(product: Product) {
    return (product.id ? this.updateProduct(product) : this.createProduct(product));
  }

  createProduct(product: Product) {
    return this.httpClient.post(BACK_END + 'products', product) as Observable<any>;
  }

  updateProduct(product: Product) {
    return this.httpClient.put(BACK_END + `products/${product.id}`, product) as Observable<any>;
  }

  private processProducts(res) {
    return res.data.map(pr => this.processProduct(pr));
  }

  private processProduct(data) {
    const {
      id,
      name,
      description,
      price,
      categories,
      rating,
      images,
      reviews,
      quantity,
      coverImage
    } = data;

    return new Product(
      id,
      name,
      description,
      price,
      categories,
      Math.round(rating * 100) / 100,
      images,
      reviews,
      quantity,
      coverImage
    );
  }

  private queryBuilder(options: Options) {
    let query = '';
    query += options.page ? `page=${options.page}&` : '';
    query += options.size ? `size=${options.size}&` : '';
    query += options.prices[0] ? `priced=${options.prices[0]}&` : '';
    query += options.prices[1] !== Infinity ? `priceu=${options.prices[1]}&` : '';
    query += options.sort[0] ? `order=${options.sort[0]}&` : '';
    query += options.sort[1] ? `dir=${options.sort[1]}&` : '';
    query += options.categoryList.length === 0 ? '' : `categories=${options.categoryList.join(',')}&`;
    query += options.searchQuery ? `search=${options.searchQuery}&` : '';
    return query;
  }
}
