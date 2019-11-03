import { Cart } from '../../model/cart';
import { ShippingInfos } from '../../model/shipping-info';

export class Order{
    constructor(
        public cart:Cart,
        public shippingInfo:ShippingInfos
    ){}
}