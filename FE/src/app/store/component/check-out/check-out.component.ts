import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/Models/cart';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: Cart;
  displayedColumns: string[] = ['Product', 'Quantity','Price'];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart=>{
      this.cart=cart;
    });
  }

  goShipping(){
    this.router.navigate(["store/shipping"]);
  }
  goStore(){
    this.router.navigate(["store"]);
  }
  increment(id:number){
    this.cart.items[this.cart.indexByProduct(id)].itemQuantity++;
    this.cartService.updateCart(this.cart);
  }

  decrement(id:number){
    if(this.cart.items[this.cart.indexByProduct(id)].itemQuantity>=1){
      this.cart.items[this.cart.indexByProduct(id)].itemQuantity--;
    }
    this.cartService.updateCart(this.cart);
  }

  ngOnDestroy(){
    this.cartService.upLoadCart(this.cart).pipe(take(1)).subscribe(cart=>console.log('succes'));
  }
}
