import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductReview } from 'src/app/models/product-review';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss'],
})
export class MyReviewsComponent implements OnInit {
  myReviews: ProductReview[] = [];
  p: number = 1;

  constructor(private reviewService: ReviewService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.reviewService
      .getReviews()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        this.myReviews = res.data;
      });
  }

  pageReviewChange(e) {
    this.p = e;
  }

  goProduct(productId: number) {
    this.router.navigate(['store', 'products', productId]);
  }
}
