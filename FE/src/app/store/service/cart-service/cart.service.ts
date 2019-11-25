import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/shared/Models/cart';
import { UUID } from 'angular2-uuid';
import { BACK_END } from 'backend';
import { take, map } from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account-service/account.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject<Cart>(new Cart(localStorage.getItem('cartId')?localStorage.getItem('cartId'):UUID.UUID(),'',[]));

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) { }

  upLoadCart(cart: Cart) {
    return this.httpClient.put(BACK_END+"carts",cart);
  }

  loadCart(){
    if(localStorage.getItem('cartId')){
      this.loadCartById(localStorage.getItem('cartId'));
    }

    this.accountService.loadCurrentUser();
    this.accountService.getCurrentUser().subscribe(user=>{
      if(user.userEmail)
        this.loadCartByUserEmail(user.userEmail);
    });

  }

  private loadCartByUserEmail(email:String) {
    this.httpClient.get(BACK_END+"carts/email/"+email).pipe(take(1)).subscribe((cartDb: Cart)=>{
      let cart=new Cart(cartDb.cartId,cartDb.userEmail,cartDb.items);
      this.cartSubject.next(cart);
    });
  }

  private loadCartById(id:String) {
    this.httpClient.get(BACK_END+"carts/"+id).pipe(take(1)).subscribe((cartDb: Cart)=>{
      let cart=new Cart(cartDb.cartId,cartDb.userEmail,cartDb.items);
      this.cartSubject.next(cart);
    },error=>console.log(error));
  }
  
  getCart(){
    return this.cartSubject.pipe(map(cart=>{
      localStorage.setItem('cartId',cart.cartId.toString());
      return cart;
  }));
  }

  updateCart(cart: Cart){
    this.cartSubject.next(cart);
  }
}