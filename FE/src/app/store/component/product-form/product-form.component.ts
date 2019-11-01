import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../model/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cart } from '../../model/cart';
import { CartService } from '../../service/cart-service/cart.service';
import { CartItem } from '../../model/CartItem';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  cart: Cart;
  
  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private cartService: CartService
  ) {}

  onNoClick(){
    this.dialogRef.close();
  }

  ngOnInit() {
    this.cartService.cartStatus().subscribe(cart=>{
      this.cart=cart;
    });
  }

  addToCart(){
    this.cart.items.push(new CartItem(
      this.product.productId,
      this.product.price,
      this.product.title,
      1
    ));
    this.cartService.updateCart(this.cart);
  }

  increment(){
    this.cart.items[this.cart.indexByProduct(this.product.productId)].itemQuantity++;
    this.cartService.updateCart(this.cart);
  }

  decrement(){
    this.cart.items[this.cart.indexByProduct(this.product.productId)].itemQuantity--;
    if(this.cart.items[this.cart.indexByProduct(this.product.productId)].itemQuantity===0)
      this.cart.items.splice(this.cart.indexByProduct(this.product.productId),1);
    this.cartService.updateCart(this.cart);
  }
}
