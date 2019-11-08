import { Cart } from './cart';
import { ShippingInfos } from './shipping-info';


export class Order{
    constructor(
        public cart:Cart,
        public shippingInfo:ShippingInfos,
        public orderDate: Date=new Date(),
        public isProccessed: Boolean=false
    ){}

}