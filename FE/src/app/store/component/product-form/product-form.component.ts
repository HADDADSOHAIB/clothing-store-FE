import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../model/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cart } from '../../model/cart';
import { CartService } from '../../service/cart-service/cart.service';
import { CartItem } from '../../model/CartItem';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/Operators';
import { ProductsService } from '../../service/products-service/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  cart: Cart;
  product:Product;

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productService:ProductsService
  ) {}

  async ngOnInit() {
    this.cartService.cartStatus().subscribe(cart=>{
      this.cart=cart;
    });

    await this.activatedRoute.paramMap.pipe(take(1)).toPromise().then(async params=>{
      if(params.get('id'))
        this.product=await this.productService.get(parseInt(params.get('id'))).toPromise();
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
