import { Cart } from './cart';
import { ShippingInfos } from './shipping-info';
import { OrderItem } from './order-item';


export class Order{
    constructor(
        public id: number,
        public userEmail:string,
        public orderItems: OrderItem[],
        public shippingInfo:ShippingInfos,
        public orderDate: Date=new Date(),
        public isProcessed: Boolean=false
    ){}
}