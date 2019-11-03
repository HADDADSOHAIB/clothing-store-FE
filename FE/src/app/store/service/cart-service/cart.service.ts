import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../model/cart';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject<Cart>(new Cart(-1,"",[]));

  constructor(
    private httpClient: HttpClient
  ) { }

  upLoadCart(cart: Cart) {
    this.httpClient.post("",cart);
  }
  loadCart() {
    return this.httpClient.get("") as Observable<Cart>;
  }
  
  cartStatus(){
    return this.cartSubject;
  }

  updateCart(cart: Cart){
    this.cartSubject.next(cart);
  }
}
