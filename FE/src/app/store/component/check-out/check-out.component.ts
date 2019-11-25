import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/Models/cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  cart: Cart;
  displayedColumns: string[] = ['Product', 'Quantity',' ','Price'];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart=>{
      this.cart=cart;
    });
  }

  changeQuantity(id:number,quantity:string){
    let index=this.cart.items.findIndex(item=>item.itemId===id);
    if(parseInt(quantity)<0)
      console.log("error");
    else
    this.cart.items[index].itemQuantity=parseInt(quantity);
  }

  goShipping(){
    this.router.navigate(["store/shipping"]);
  }
  goStore(){
    this.router.navigate(["store"]);
  }
}
