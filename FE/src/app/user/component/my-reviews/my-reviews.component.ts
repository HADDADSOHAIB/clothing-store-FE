import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductReview } from 'src/app/models/product-review';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  myReviews: ProductReview[] = [];
  myProducts: Map<number, Product> = new Map<number, Product>();
  currentUser: User = new User(0, '', '', '', '', '', [], []);
  idOfReviewToModify = 0;
  productReviewModified: ProductReview = new ProductReview(0, null, 5, '', 0);


  constructor(
    private reviewService: ReviewService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.accountService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.loadMuReviews();
    });
  }

  private loadMuReviews() {
    this.reviewService.getReviewsByUser(this.currentUser.userEmail).pipe(take(1))
      .subscribe(reviews => {
        this.myReviews = reviews;
        this.myReviews.forEach(review => this.myProducts.set(review.productId, new Product()));
        this.productService.getProductsByIds(this.myReviews.map(review => review.productId)).pipe(take(1))
        .subscribe(products => products.forEach(product => this.myProducts.set(product.productId, product)));
      });
  }

  editReview(reviewId: number) {
    this.productReviewModified = this.myReviews.find(review => review.id === reviewId);
    this.idOfReviewToModify = reviewId;
  }

  deleteReview(reviewId: number) {
    this.reviewService.deleteReview(reviewId).pipe(take(1)).subscribe(response => {
      this.snackBar.open('review removed', 'Ok');
      this.reviewService.getReviewsByUser(this.currentUser.userEmail).pipe(take(1))
      .subscribe(reviews => {
        this.myReviews = reviews;
      });
    }, error => {
      console.log(error);
      this.snackBar.open('error try later', 'Ok');
    });
  }

  modifyRating(rating: number) {
    this.productReviewModified.userRating = rating;
  }

  saveModifiedReview(reviewId: number) {
    const productId = this.myReviews.find(review => review.id === reviewId).productId;
    this.idOfReviewToModify = 0;
    this.productReviewModified.productId = productId;
    if (this.currentUser.userEmail) {
      this.productReviewModified.user = this.currentUser;
      this.reviewService.updateReview(this.productReviewModified).pipe(take(1)).subscribe(review => {
        this.snackBar.open('Review Added', 'OK', { duration: 2000 });
        this.loadMuReviews();
        this.productReviewModified = new ProductReview(0, null, 5, '', 0);
      }, error => {
        console.log(error);
        this.snackBar.open('Error, try later', 'Ok', { duration: 2000 });
      });
    } else {
      this.router.navigate(['auth/signin']);
    }
  }

  cancelModification() {
    this.idOfReviewToModify = 0;
    this.productReviewModified = new ProductReview(0, null, 5, '', 0);
  }

  goProduct(productId: number) {
    this.router.navigate(['store/product/' + productId]);
  }

}
