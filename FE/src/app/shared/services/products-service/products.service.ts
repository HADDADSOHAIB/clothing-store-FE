import { Injectable } from '@angular/core';
import { Product } from '../../Models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BACK_END } from 'backend';
import { take, switchMap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productSubjects:BehaviorSubject<Product[]>=new BehaviorSubject([]);
  constructor(private httpClient:HttpClient) {}

  loadProducts(itemsPerPage: number,pageNumber: number) {
    (this.httpClient.get(BACK_END+"/products?page="+pageNumber+"&&size="+itemsPerPage) as Observable<Product[]>)
      .pipe(take(1)).subscribe(productList=>this.productSubjects.next(productList));
  }

  getProducts(){
    return this.productSubjects;
  }

  getAvailableProductCount() {
    return this.httpClient.get(BACK_END+"productscount") as Observable<number>;
  }

  getProduct(id: number) {
    return this.httpClient.get(BACK_END+"products/"+id) as Observable<Product>;
  }

  addProduct(product:Product){
    return this.httpClient.post(BACK_END+"products",product) as Observable<Product>;
  }
  deleteProduct(id: number) {
    return this.httpClient.delete(BACK_END+"products/"+id) as Observable<Product>;
  }
  updateProduct(product:Product){
    return this.httpClient.post(BACK_END+"products/"+product.productId,product) as Observable<Product>;
  }
}
