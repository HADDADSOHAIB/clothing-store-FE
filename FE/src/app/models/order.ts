import { Cart } from './cart';
import { ShippingInfos } from './shipping-info';
import { OrderItem } from './order-item';


export class Order {
		constructor(
				public id: number,
				public userEmail: string,
				public orderItems: OrderItem[],
				public shippingInfo: ShippingInfos,
				public orderDate: Date,
				public processedDate: Date,
				public inRouteDate: Date,
				public deliveryDate: Date,
				public deliveryConfirmationDate: Date,
				public cancelationDate: Date,
		) {}

		totalPrice() {
				let totalPrice = 0;
				this.orderItems.forEach(item => totalPrice += item.price * item.quantity);
				return totalPrice;
		}

		totalQuantity() {
				let totalQuantity = 0;
				this.orderItems.forEach(item => totalQuantity += item.quantity);
				return totalQuantity;
		}
}
