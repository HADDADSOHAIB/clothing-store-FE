import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';

@Component({
	selector: 'app-check-out',
	templateUrl: './check-out.component.html',
	styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
	items$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
	cart: Cart = new Cart(null, null, []);
  s: Subscription;
	displayedColumns: string[] = ['Product', 'Quantity', 'Price'];

	constructor(
		private cartService: CartService,
		private router: Router,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.s = this.cartService.userCart$.subscribe(
      cart => {
        this.cart = cart;
        this.items$.next(cart.items);
      }
    );
	}

	goShipping() {
		this.router.navigate(['store/shipping']);
	}

	goStore() {
		this.router.navigate(['store']);
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
}
