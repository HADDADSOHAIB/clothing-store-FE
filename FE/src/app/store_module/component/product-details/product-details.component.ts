import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { take, find } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductReview } from 'src/app/models/product-review';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { CartItem } from 'src/app/models/cartItem';
import { UploadFilesService } from 'src/app/services/upload-files-service/upload-files.service';
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
  product: Product = new Product(null, null, null, null, null, null, null, null, null, null);

  productReview: ProductReview = new ProductReview(0, null, 5, '', 0);
  productReviewModified: ProductReview = new ProductReview(0, null, 5, '', 0);
  currentUser: User;
  idOfReviewToModify = 0;
  imageUrls: String[] = [];

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private accountService: AccountService,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fileService: UploadFilesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((res) => {
      const productId = res['params']['id'];
      this.productService
        .getProduct(productId)
        .pipe(take(1))
        .subscribe((res) => (this.product = res));
    });
  }

  addToCart() {
    // this.cart.items.push(new CartItem(0, this.product.price, 1, this.product));
    // this.cartService.upLoadCart(this.cart);
    // this.cartService.updateCart(this.cart);
  }

  increment() {
    // if (this.cart.items[this.cart.indexByProduct(this.product.id)].itemQuantity < this.product.quantity) {
    //   this.cart.items[this.cart.indexByProduct(this.product.id)].itemQuantity++;
    //   this.cartService.upLoadCart(this.cart);
    //   this.cartService.updateCart(this.cart);
    // } else {
    //   this.snackBar.open('Stock out, there is no more items', 'Ok', { duration: 2000 });
    // }
  }

  decrement() {
    // this.cart.items[this.cart.indexByProduct(this.product.id)].itemQuantity--;
    // if (this.cart.items[this.cart.indexByProduct(this.product.id)].itemQuantity === 0) {
    //   // this.cart.items.splice(this.cart.indexByProduct(this.product.id), 1);
    // }
    // this.cartService.upLoadCart(this.cart);
    // this.cartService.updateCart(this.cart);
  }

  changeRating(rating: number) {
    // this.productReview.userRating = rating;
  }

  modifyRating(rating: number) {
    // this.productReviewModified.userRating = rating;
  }

  saveModifiedReview() {
    // this.idOfReviewToModify = 0;
    // this.productReviewModified.id = this.product.id;
    // if (this.currentUser.userEmail) {
    //   this.productReviewModified.user = this.currentUser;
    //   this.reviewService
    //     .updateReview(this.productReviewModified)
    //     .pipe(take(1))
    //     .subscribe(
    //       (review) => {
    //         this.snackBar.open('Review Added', 'OK', { duration: 2000 });
    //         this.productService
    //           .getProduct(this.product.id)
    //           .pipe(take(1))
    //           .subscribe((product) => (this.product = product));
    //         this.productReviewModified = new ProductReview(0, null, 5, '', 0);
    //       },
    //       (error) => {
    //         console.log(error);
    //         this.snackBar.open('Error, try later', 'Ok', { duration: 2000 });
    //       }
    //     );
    // } else {
    //   this.router.navigate(['auth/signin']);
    // }
  }

  saveReview() {
    // this.productReview.id = this.product.id;
    // if (this.currentUser.userEmail) {
    //   this.productReview.user = this.currentUser;
    //   this.reviewService
    //     .addReview(this.productReview)
    //     .pipe(take(1))
    //     .subscribe(
    //       (review) => {
    //         this.snackBar.open('Review Added', 'OK', { duration: 2000 });
    //         this.productService
    //           .getProduct(this.product.id)
    //           .pipe(take(1))
    //           .subscribe((product) => (this.product = product));
    //         this.productReview = new ProductReview(0, null, 4, '', 0);
    //       },
    //       (error) => {
    //         console.log(error);
    //         this.snackBar.open('Error, try later', 'Ok', { duration: 2000 });
    //       }
    //     );
    // } else {
    //   this.router.navigate(['auth/signin']);
    // }
  }

  deleteReview(reviewId) {
    // this.reviewService
    //   .deleteReview(reviewId)
    //   .pipe(take(1))
    //   .subscribe(
    //     (response) => {
    //       this.snackBar.open('review removed', 'Ok');
    //       this.productService
    //         .getProduct(this.product.id)
    //         .pipe(take(1))
    //         .subscribe((product) => (this.product = product));
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.snackBar.open('error try later', 'Ok');
    //     }
    //   );
  }

  editReview(reviewId: number) {
    // this.productReviewModified = this.product.reviews.find((review) => review.id === reviewId);
    // this.idOfReviewToModify = reviewId;
  }

  cancelModification() {
    // this.idOfReviewToModify = 0;
    // this.productReviewModified = new ProductReview(0, null, 5, '', 0);
  }
}
