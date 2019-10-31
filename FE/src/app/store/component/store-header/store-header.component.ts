import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../../model/cart';
import { CartService } from '../../service/cart-service/cart.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent implements OnInit,OnDestroy {
  cart: Cart=new Cart(-1,"",[]);
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    if(localStorage.getItem("token")!=="")
    this.cart.ownerToken=localStorage.getItem("token");

    this.cartService.updateCart(this.cart);

    this.cartService.cartStatus().subscribe(cart=>this.cart=cart);

    this.cartService.loadCart().pipe(take(1)).subscribe(cartDb=>this.cartService.updateCart(cartDb));
  }

  ngOnDestroy(){
    this.cartService.upLoadCart(this.cart);
  }
}
