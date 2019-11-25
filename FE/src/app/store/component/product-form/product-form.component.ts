import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProductsService } from '../../../shared/services/products-service/products.service';
import { Cart } from 'src/app/shared/Models/cart';
import { Product } from 'src/app/shared/Models/product';
import { CartItem } from 'src/app/shared/Models/CartItem';
import { ProductReview } from 'src/app/shared/Models/product-review';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  cart: Cart;
  product:Product;
  productReview:ProductReview=new ProductReview(null,2.5,"");

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productService:ProductsService
  ) {}

  async ngOnInit() {
    this.cartService.getCart().subscribe(cart=>{
      this.cart=cart;
    });

    await this.activatedRoute.paramMap.pipe(take(1)).toPromise().then(async params=>{
      if(params.get('id'))
        this.product=await this.productService.getProduct(parseInt(params.get('id'))).toPromise();
    });
  }

  addToCart(){
    this.cart.items.push(new CartItem(
      0,
      this.product.price,
      1,
      this.product
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
