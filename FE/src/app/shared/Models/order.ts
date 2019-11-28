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
        public isProcessed: Boolean=false,
        public isCanceled: Boolean=false,
    ){}

    totalPrice(){
        let totalPrice=0;
        this.orderItems.forEach(item=>totalPrice+=item.price*item.quantity);
        return totalPrice;
    }

    totalQuantity(){
        let totalQuantity=0;
        this.orderItems.forEach(item=>totalQuantity+=item.quantity);
        return totalQuantity;
    }
}
