import { Injectable } from '@angular/core';
import { Order } from '../../Models/order';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  static ordersDb: Order[]=[];
  orderSubject: BehaviorSubject<Order[]>=new BehaviorSubject(OrderService.ordersDb);

  constructor() { 
    console.log("h");
  }

  placeOrder(order: Order) {
    OrderService.ordersDb.push(order);
    this.orderSubject.next(OrderService.ordersDb);
    console.log(order);
  }

  getUnprocessedOrders() {
    return this.orderSubject.pipe(map(orders=>orders.filter(order=>order.isProccessed===false)));
  }
}
