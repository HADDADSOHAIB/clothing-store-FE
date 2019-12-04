import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductReview } from 'src/app/shared/Models/product-review';
import { BACK_END } from 'backend';
import { Observable, of } from 'rxjs';
import { User } from '../../Models/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getReviewsByUser(email:string){
    if(email==""){
      return of([]);
    }
    else
    return this.httpClient.get(BACK_END+"reviews?email="+email) as Observable<ProductReview[]>;
  }
  addReview(productReview: ProductReview){
    return this.httpClient.post(BACK_END+"reviews",productReview) as Observable<ProductReview>;
  }

  updateReview(productReview: ProductReview){
    return this.httpClient.put(BACK_END+"reviews/"+productReview.id,productReview) as Observable<ProductReview>;
  }
  deleteReview(reviewId: number){
    return this.httpClient.delete(BACK_END+"reviews/"+reviewId);
  }
}