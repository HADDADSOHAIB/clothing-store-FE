export class OrderItem{
    constructor(
        public itemId: number,
        public productId: number,
        public productName: string,
        public quantity: number,
        public price: number
    ){}
}