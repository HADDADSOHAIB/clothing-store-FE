import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-details/product-details.component';
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { UploadFilesService } from 'src/app/services/upload-files-service/upload-files.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  cart: Cart = new Cart(null, null, []);
  s: Subscription;


  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.s = this.cartService.userCart$.subscribe(
      cart => this.cart = cart
    );
  }

  addToCart(productId: number, cartId: number) {
    if(cartId) {
      this.cartService.addItem(productId, cartId).pipe(take(1)).subscribe(
        res => {
          const { id, cartdId, productId, price, quantity } = res['data'];
          this.cart.addItem(new CartItem(id, price, quantity, productId, cartId));
          this.cartService.userCart$.next(this.cart);
        }
      );
    }
    else {
      this.router.navigate(['auth', 'signup']);
      this.snackBar.open('You must login/register to buy items', 'Ok', { duration: 3000 });
    }
  }

  increment(productId: number) {
    const itemId = this.cart.itemIdByProduct(productId);
    if(itemId) {
      this.cartService.increase(itemId).pipe(take(1)).subscribe(
        res => {
          this.cart.increase(itemId);
          this.cartService.userCart$.next(this.cart);
        }
      );
    }
    else {
      this.router.navigate(['auth', 'signup']);
      this.snackBar.open('You must login/register to buy items', 'Ok', { duration: 3000 });
    }
  }

  decrement(productId: number) {
    const itemId = this.cart.itemIdByProduct(productId);
    if(itemId) {
      this.cartService.decrease(itemId).pipe(take(1)).subscribe(
        res => {
          this.cart.decrease(itemId);
          this.cartService.userCart$.next(this.cart);
        }
      );
    }
    else {
      this.router.navigate(['auth', 'signup']);
      this.snackBar.open('You must login/register to buy items', 'Ok', { duration: 3000 });
    }
  }

  details(id: number) {
    this.router.navigate(['store', 'product', id]);
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
