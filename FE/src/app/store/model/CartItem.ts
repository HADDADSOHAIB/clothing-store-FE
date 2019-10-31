export class CartItem{
    
    constructor(
        public itemId:number, 
        public itemPrice:number, 
        public itemName:string,
        public itemQuantity:number
    ) {
            
    }
}