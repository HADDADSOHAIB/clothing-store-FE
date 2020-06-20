import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Cart } from 'src/app/models/cart';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { take } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cartItem';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-actions',
  templateUrl: './cart-actions.component.html',
  styleUrls: ['./cart-actions.component.scss'],
})
export class CartActionsComponent implements OnInit, OnDestroy {
  cart: Cart = new Cart(null, null, []);
  s: Subscription;
  @Input() productId: number;
  @Input() cartLogo: boolean = false;

  constructor(private cartService: CartService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.s = this.cartService.userCart$.subscribe((cart) => (this.cart = cart));
  }

  addToCart(productId: number, cartId: number) {
    if (cartId) {
      this.cartService
        .addItem(productId, cartId)
        .pipe(take(1))
        .subscribe((res) => {
          const { id, productId, price, quantity, name } = res['data'];
          this.cart.addItem(new CartItem(id, price, quantity, productId, cartId, name));
          this.cartService.userCart$.next(this.cart);
        });
    } else {
      this.router.navigate(['auth', 'signup']);
      this.snackBar.open('You must login/register to buy items', 'Ok', { duration: 3000 });
    }
  }

  increment(productId: number) {
    const itemId = this.cart.itemIdByProduct(productId);
    if (itemId) {
      this.cartService
        .increase(itemId)
        .pipe(take(1))
        .subscribe((res) => {
          this.cart.increase(itemId);
          this.cartService.userCart$.next(this.cart);
        });
    } else {
      this.router.navigate(['auth', 'signup']);
      this.snackBar.open('You must login/register to buy items', 'Ok', { duration: 3000 });
    }
  }

  decrement(productId: number) {
    const itemId = this.cart.itemIdByProduct(productId);
    if (itemId) {
      this.cartService
        .decrease(itemId)
        .pipe(take(1))
        .subscribe((res) => {
          this.cart.decrease(itemId);
          this.cartService.userCart$.next(this.cart);
        });
    } else {
      this.router.navigate(['auth', 'signup']);
      this.snackBar.open('You must login/register to buy items', 'Ok', { duration: 3000 });
    }
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
