import { Cart } from './cart';
import { ShippingInfos } from './shipping-info';
import { OrderItem } from './order-item';

export class Order {
  constructor(
    public id: number,
    public userId: number,
    public orderItems: OrderItem[],
    public shippingInfos: ShippingInfos,
    public orderDate: Date,
    public processedDate: Date,
    public inRouteDate: Date,
    public deliveryDate: Date,
    public deliveryConfirmationDate: Date,
    public cancelationDate: Date
  ) {}

  totalPrice() {
    let totalPrice = 0;
    this.orderItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  }

  totalQuantity() {
    let totalQuantity = 0;
    this.orderItems.forEach((item) => (totalQuantity += item.quantity));
    return totalQuantity;
  }

  status() {
    if (this.cancelationDate) {
      return 'canceled';
    } else if (this.processedDate) {
      return 'Proccessed';
    } else if (this.inRouteDate) {
      return 'In Route';
    } else if (this.deliveryDate) {
      return 'Delivered';
    } else if (this.deliveryConfirmationDate) {
      return 'Delivery confirmed';
    } else {
      return 'Ordered';
    }
  }
}
