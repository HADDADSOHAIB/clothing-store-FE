import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/core/Models/cart';

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
