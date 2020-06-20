import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, find } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductReview } from 'src/app/models/product-review';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import {
  MatCarousel,
  MatCarouselComponent,
  MatCarouselSlide,
  MatCarouselSlideComponent,
} from '@ngmodule/material-carousel';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetails implements OnInit {
  cart: Cart;
  product: Product = new Product(null, null, null, null, null, null, null, [], null, null);
  p: number = 1;
  newReview: ProductReview = new ProductReview(0, null, 5, '', 0);

  currentUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private accountService: AccountService,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((res) => {
      const productId = res['params']['id'];
      this.productService
        .getProduct(productId)
        .pipe(take(1))
        .subscribe((res) => {
          this.product = res;
          console.log(this.product.reviews);
        });
    });
  }

  changeNewRating(e) {
    this.newReview.rating = e;
  }

  pageReviewChange(e) {
    this.p = e;
  }

  saveNewReview() {
    console.log(this.newReview);
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.newReview.userId = user.id;
        this.newReview.productId = this.product.id;
        this.reviewService
          .createReview(this.newReview)
          .pipe(take(1))
          .subscribe((res) => {
            this.newReview.id = res.data.id;
            this.newReview['user'] = user;
            this.product.reviews.unshift(this.newReview);
            this.newReview = new ProductReview(0, null, 5, '', 0);
            this.snackBar.open('Review added successfuly', 'Ok', { duration: 3000 });
          });
      } else {
        this.router.navigate(['auth', 'login']);
        this.snackBar.open('To give a review, you must be logged in', 'Ok', { duration: 3000 });
      }
    });
  }

  controleNewReview() {
    if (this.newReview.review.length > 99) this.newReview.review = this.newReview.review.slice(0, 99);
  }
}
