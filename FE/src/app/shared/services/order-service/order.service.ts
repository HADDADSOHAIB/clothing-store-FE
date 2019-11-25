import { Injectable } from '@angular/core';
import { Order } from '../../Models/order';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cart } from '../../Models/cart';
import { CartItem } from '../../Models/CartItem';
import { ShippingInfos } from '../../Models/shipping-info';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 


  constructor() { 
  }

  placeOrder(order: Order) {
//     OrderService.ordersDb.push(order);
//     this.ordersSubject.next(OrderService.ordersDb);
//     console.log(order);
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
