import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClient: HttpClient) {
  }

  placeOrder(order: Order) {
    return this.httpClient.post(BACK_END + 'orders', order);
  }

  getOrders(pageNumber: number, pageSize: number, sort: string[]= ['orderDate', 'desc']) {
    return this.httpClient.get(BACK_END + 'orders?page=' + pageNumber + '&&size=' + pageSize +
      '&&sort=' + sort.join(',')) as Observable<Order[]>;
  }
  getOrdersCount(pageNumber: number, pageSize: number) {
    return this.httpClient.get(BACK_END + 'orderscount?page=' + pageNumber + '&&size=' + pageSize) as Observable<number>;
  }

  getOrdersByStatus(pageNumber: number, pageSize: number, status: string) {
    return this.httpClient.get(BACK_END + 'ordersbystatus?page=' + pageNumber + '&&size=' + pageSize +
      '&&status=' + status) as Observable<Order[]>;
  }
  getOrdersCountByStatus(pageNumber: number, pageSize: number, status: string) {
    return this.httpClient.get(BACK_END + 'orderscountbystatus?page=' + pageNumber + '&&size=' + pageSize
    + '&&status=' + status) as Observable<number>;
  }

  getOrdersByUser(userEmail: String) {
    return this.httpClient.get(BACK_END + 'orders/email/' + userEmail) as Observable<Order[]>;
  }

  getOrder(id: number) {
    return this.httpClient.get(BACK_END + 'orders/' + id) as Observable<Order>;
  }

  UpdateOrder(order: Order) {
    return this.httpClient.put(BACK_END + 'orders/' + order.id, order) as Observable<Order>;
  }
}
