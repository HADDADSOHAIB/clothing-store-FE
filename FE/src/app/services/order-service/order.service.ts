import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Order } from 'src/app/models/order';
import { ShippingInfos } from 'src/app/models/shipping-info';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  placeOrder(order: Order) {
    return this.httpClient.post(BACK_END + 'orders', order) as Observable<any>;
  }

  getOrders() {
    return this.httpClient.get(`${BACK_END}orders`).pipe(map((res) => this.processOrders(res))) as Observable<Order[]>;
  }

  getOrder(id: number) {
    return this.httpClient
      .get(`${BACK_END}orders/${id}`)
      .pipe(map((res) => this.processOrder(res['data']))) as Observable<Order>;
  }

  updateOrder(order: Order) {
    return this.httpClient.patch(`${BACK_END}orders/${order.id}`, order) as Observable<any>;
  }

  private processOrders(res) {
    return res.data.map((order) => this.processOrder(order));
  }

  private processOrder(data) {
    const {
      id,
      userId,
      user,
      items,
      shippingInfos,
      orderDate,
      processedDate,
      inRouteDate,
      deliveryDate,
      deliveryConfirmationDate,
      cancelationDate,
    } = data;

    const order = new Order(
      id,
      userId,
      items,
      shippingInfos,
      orderDate,
      processedDate,
      inRouteDate,
      deliveryDate,
      deliveryConfirmationDate,
      cancelationDate
    );

    order['user'] = user;
    return order;
  }
}
