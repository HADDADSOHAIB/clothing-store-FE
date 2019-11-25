import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { take } from 'rxjs/operators';
import { Cart } from 'src/app/shared/Models/cart';
import { UUID } from 'angular2-uuid';
import { User } from 'src/app/shared/Models/user';
import { AccountService } from 'src/app/shared/services/account-service/account.service';

@Component({
  selector: 'store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent implements OnInit,OnDestroy {
  cart: Cart;
  user:User;
  constructor(
    private cartService: CartService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.getCart().subscribe(cart=>this.cart=cart);
  }

  ngOnDestroy(){
    this.cartService.upLoadCart(this.cart).pipe(take(1)).subscribe(cart=>console.log("succes"));
  }
}
