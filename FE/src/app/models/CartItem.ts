import { Product } from './product';

export class CartItem{
    
    constructor(
        public itemId:number, 
        public itemPrice:number, 
        public itemQuantity:number,
        public product:Product
    ) {
    }
}