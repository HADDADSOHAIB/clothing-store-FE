import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/Models/product';
import { Cart } from 'src/app/core/Models/cart';
import { CartItem } from 'src/app/core/Models/CartItem';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  cart: Cart;
  itemIndex: number=-1;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cartService.cartStatus().subscribe(cart=>{
      this.cart=cart;
      this.findOrUpdateIndex();
    });
  }

  addToCart(){
    this.cart.items.push(new CartItem(
      this.product.productId,
      this.product.price,
      this.product.productName,
      1
    ));
    this.cartService.updateCart(this.cart);
  }

  increment(){
    this.findOrUpdateIndex();
    this.cart.items[this.itemIndex].itemQuantity++;
    this.cartService.updateCart(this.cart);
  }

  decrement(){
    this.findOrUpdateIndex();
    this.cart.items[this.itemIndex].itemQuantity--;
    if(this.cart.items[this.itemIndex].itemQuantity===0)
      this.cart.items.splice(this.itemIndex,1);
    this.cartService.updateCart(this.cart);
  }

  private findOrUpdateIndex(){
    this.itemIndex=this.cart.items.findIndex(item=>item.itemId===this.product.productId);
  }

  details(){
    console.log("navigate");
    this.router.navigate(["store/product/",this.product.productId]);
  }
}
