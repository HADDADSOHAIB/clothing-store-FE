import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent implements OnInit{
  cart: Cart;
  user:User;
  
  constructor(
    private cartService: CartService  ) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.getCart().subscribe(cart=>this.cart=cart);
  }
}