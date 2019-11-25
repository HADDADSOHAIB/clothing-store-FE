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
  private isCartInDb:boolean=false;
  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) { }

  upLoadCart(cart: Cart) {
    if(this.isCartInDb)
    return this.httpClient.put(BACK_END+"carts/"+cart.cartId,cart);
    else
      return this.httpClient.post(BACK_END+"carts",cart);
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
      this.isCartInDb=true;
      this.cartSubject.next(cart);
    }, error=>{
      console.log(error);
      this.getCart().pipe(take(1)).subscribe(cartDb=>{
        let cart=new Cart(cartDb.cartId,email.toString(),cartDb.items);
        this.isCartInDb=true;
        this.upLoadCart(cart).pipe(take(1)).subscribe(cart=>console.log("succes"));
        this.cartSubject.next(cart);
      });
    });
  }

  private loadCartById(id:String) {
    this.httpClient.get(BACK_END+"carts/"+id).pipe(take(1)).subscribe((cartDb: Cart)=>{
      let cart=new Cart(cartDb.cartId,cartDb.userEmail,cartDb.items);
      this.isCartInDb=true;
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