import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { BACK_END } from 'backend';
import { take, map } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { AccountService } from '../account-service/account.service';
import { CartItem } from 'src/app/models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userCart$: BehaviorSubject<Cart>=new BehaviorSubject(new Cart(null, null, []));
  
  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {}

  getCartByUser(id: number) {
    return this.httpClient.get(BACK_END + `users/${id}/cart`).pipe(map((res) => this.proccess(res))) as Observable<
      Cart
    >;
  }

  addItem(productId: number, cartId: number) {
    return this.httpClient.post(`${BACK_END}carts/${cartId}/items`, { productId });
  };

  increase(itemId: number) {
    return this.httpClient.patch(`${BACK_END}cartItems/${itemId}/increase`, {});
  };

  decrease(itemId: number) {
    return this.httpClient.patch(`${BACK_END}cartItems/${itemId}/decrease`, {});
  };

  private proccess(res) {
    const items = [];
    res.data.items.forEach((item) => {
      const { id, productId, cartId, price, quantity } = item;
      items.push(new CartItem(id, price, quantity, productId, cartId));
    });
    return new Cart(res.data.id, res.data.userId, items);
  }
}
