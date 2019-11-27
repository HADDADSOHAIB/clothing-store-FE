import { Injectable } from '@angular/core';
import { Order } from '../../Models/order';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getOrders() {
    return this.httpClient.get(BACK_END+"orders") as Observable<Order[]>;
  }

  getOrdersByUser(userEmail:String) {
    return this.httpClient.get(BACK_END+"orders/email/"+userEmail) as Observable<Order[]>;
  }

  getOrder(id: number) {
    return this.httpClient.get(BACK_END+"orders/"+id) as Observable<Order>;
  }

  UpdateOrder(order:Order){
    return this.httpClient.put(BACK_END+'orders/'+order.id,order) as Observable<Order>;
  }
}
