import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Category } from 'src/app/models/category';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  addCategory(category: Category) {
    return this.httpClient.post(BACK_END + 'categories', category) as Observable<Category>;
  }

  getCategories() {
    return this.httpClient.get(BACK_END + 'categories').pipe(map((res) => this.processCategories(res))) as Observable<
      any
    >;
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(BACK_END + 'categories/' + id);
  }
  // updateCategory(category: Category) {
  //   return this.httpClient.put(BACK_END + 'categories/' + category.categoryId, category) as Observable<Category>;
  // }

  getProductsNumberOfCategory(id: number) {
    return this.httpClient.get(BACK_END + 'categories/' + id + '/productsnumber') as Observable<number>;
  }

  private processCategories(res) {
    const productsPerCategory = {};
    const categories = res['data'].map((ctg) => {
      productsPerCategory[ctg.id] = ctg.products.length;
      return new Category(ctg.id, ctg.name);
    });

    return { categories, productsPerCategory };
  }
}
