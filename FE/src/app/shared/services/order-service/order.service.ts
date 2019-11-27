import { Injectable } from '@angular/core';
import { Order } from '../../Models/order';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cart } from '../../Models/cart';
import { CartItem } from '../../Models/CartItem';
import { ShippingInfos } from '../../Models/shipping-info';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClient:HttpClient) { 
  }

  placeOrder(order: Order) {
    console.log(order);
    return this.httpClient.post(BACK_END+"orders",order);
  }

  getUnprocessedOrders() {
//     return this.ordersSubject.pipe(map(orders=>orders.filter(order=>order.isProccessed===false)));
  }

  getOrder(id: number) {
//     return this.ordersSubject.pipe(switchMap(orders=>{
//       let order=orders[orders.findIndex(ord=>ord.id===id)];
//       return new BehaviorSubject<Order>(order);
//     }));
  }
}
