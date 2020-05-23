import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Category } from 'src/app/models/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  createCategory(category: Category) {
    return this.httpClient.post(BACK_END + 'categories', category) as Observable<any>;
  }

  getCategories() {
    return this.httpClient.get(BACK_END + 'categories').pipe(map((res) => this.processCategories(res))) as Observable<
      any
    >;
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(BACK_END + 'categories/' + id);
  }

  updateCategory(category: Category) {
    return this.httpClient.patch(BACK_END + `categories/${category.id}`, category) as Observable<any>;
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
