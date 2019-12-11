import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, find } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductReview } from 'src/app/models/product-review';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  cart: Cart;
  product:Product=new Product();
  productReview:ProductReview=new ProductReview(0,null,5,"",0);
  productReviewModified:ProductReview=new ProductReview(0,null,5,"",0);
  currentUser:User;
  idOfReviewToModify=0;

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productService:ProductsService,
    private accountService:AccountService,
    private reviewService: ReviewService,
    private snackBar:MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.accountService.getCurrentUser().subscribe(user=>{
      this.currentUser=user;
      if(this.data.productId==undefined){
        this.activatedRoute.paramMap.pipe(take(1)).subscribe(params=>{
          if(params.get('id'))
            this.productService.getProduct(parseInt(params.get('id'))).pipe(take(1)).subscribe(product=>{
              this.product=product;
            });
        });
      }
      else{
        this.product=this.data;
      }
    });
    this.cartService.getCart().subscribe(cart=>{
      this.cart=cart;
    });
  }

  close(){
    this.dialogRef.close();
  }
  addToCart(){
    this.cart.items.push(new CartItem(
      0,
      this.product.price,
      1,
      this.product
    ));
    this.cartService.upLoadCart(this.cart);
    this.cartService.updateCart(this.cart);
  }

  increment(){
    if(this.cart.items[this.cart.indexByProduct(this.product.productId)].itemQuantity<this.product.quantity){
      this.cart.items[this.cart.indexByProduct(this.product.productId)].itemQuantity++;
      this.cartService.upLoadCart(this.cart);
      this.cartService.updateCart(this.cart);
    }
    else{
      this.snackBar.open("Stock out, there is no more items","Ok",{duration:2000});
    }
  }

  decrement(){
    this.cart.items[this.cart.indexByProduct(this.product.productId)].itemQuantity--;
    if(this.cart.items[this.cart.indexByProduct(this.product.productId)].itemQuantity===0)
      this.cart.items.splice(this.cart.indexByProduct(this.product.productId),1);
    this.cartService.upLoadCart(this.cart);
    this.cartService.updateCart(this.cart);
  }

  changeRating(rating: number){
    this.productReview.userRating=rating;
  }
  modifyRating(rating: number){
    this.productReviewModified.userRating=rating;
  }

  saveModifiedReview() {
    this.idOfReviewToModify=0;
    this.productReviewModified.productId = this.product.productId;
    if (this.currentUser.userEmail) {
      this.productReviewModified.user = this.currentUser;
      this.reviewService.updateReview(this.productReviewModified).pipe(take(1)).subscribe(review => {
        this.snackBar.open("Review Added", "OK", { duration: 2000 });
        this.productService.getProduct(this.product.productId).pipe(take(1)).subscribe(product => this.product = product);
        this.productReviewModified = new ProductReview(0, null, 5, "", 0);
      }, error => {
        console.log(error);
        this.snackBar.open("Error, try later", "Ok", { duration: 2000 });
      });
    }
    else {
      this.router.navigate(["auth/signin"]);
    }
  }

  saveReview() {
    this.productReview.productId = this.product.productId;
    if (this.currentUser.userEmail) {
      this.productReview.user = this.currentUser;
      this.reviewService.addReview(this.productReview).pipe(take(1)).subscribe(review => {
        this.snackBar.open("Review Added", "OK", { duration: 2000 });
        this.productService.getProduct(this.product.productId).pipe(take(1)).subscribe(product => this.product = product);
        this.productReview = new ProductReview(0, null, 4, "", 0);
      }, error => {
        console.log(error);
        this.snackBar.open("Error, try later", "Ok", { duration: 2000 });
      });
    }
    else {
      this.router.navigate(["auth/signin"]);
    }
  }

  deleteReview(reviewId){
    this.reviewService.deleteReview(reviewId).pipe(take(1)).subscribe(response=>{
      this.snackBar.open("review removed","Ok");
      this.productService.getProduct(this.product.productId).pipe(take(1))
        .subscribe(product => this.product = product);
    },error=>{
      console.log(error);
      this.snackBar.open("error try later","Ok");
    });
  }

  editReview(reviewId:number){
    this.productReviewModified=this.product.reviews.find(review=>review.id===reviewId);
    this.idOfReviewToModify=reviewId;
  }

  cancelModification(){
    this.idOfReviewToModify=0;
    this.productReviewModified=new ProductReview(0,null,5,"",0);
  }
}
