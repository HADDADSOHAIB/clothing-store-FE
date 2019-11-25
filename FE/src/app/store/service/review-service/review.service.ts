import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductReview } from 'src/app/shared/Models/product-review';
import { BACK_END } from 'backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private httpClient:HttpClient
  ) { }

  addReview(productReview: ProductReview){
    return this.httpClient.post(BACK_END+"reviews",productReview) as Observable<ProductReview>;
  }
}
