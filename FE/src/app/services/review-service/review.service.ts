import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Observable, of } from 'rxjs';
import { ProductReview } from 'src/app/models/product-review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private httpClient: HttpClient) {}

  createReview(review: ProductReview) {
    return this.httpClient.post(`${BACK_END}products/${review.productId}/reviews`, review) as Observable<any>;
  }

  getReviews() {
    return this.httpClient.get(`${BACK_END}reviews`) as Observable<any>;
  }
}
