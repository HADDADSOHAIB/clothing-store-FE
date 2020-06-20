import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  items$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cart: Cart = new Cart(null, null, []);
  s: Subscription;
  displayedColumns: string[] = ['Product', 'Quantity', 'Price'];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.s = this.cartService.userCart$.subscribe((cart) => {
      this.cart = cart;
      this.items$.next(cart.items);
    });
  }

  goShipping() {
    this.router.navigate(['store/shipping']);
  }

  goStore() {
    this.router.navigate(['store']);
  }

  details(id: number) {
    this.router.navigate(['store', 'product', id]);
  }
}
