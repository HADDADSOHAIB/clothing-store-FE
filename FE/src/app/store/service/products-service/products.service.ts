import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProducts(itemsPerPage: number,pageNumber: number) {
    return this.httpClient.get("") as Observable<Product[]>;
  }
  getAvailableProductCount() {
    return this.httpClient.get("") as Observable<number>;
  }

  constructor(private httpClient:HttpClient) { }
}
