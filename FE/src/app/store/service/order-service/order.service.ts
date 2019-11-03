import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  placeOrder(arg0: import("../../component/shipping-form/order").Order) {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
