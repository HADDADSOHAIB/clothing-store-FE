import { ProductReview } from './product-review';

export class Product{
    
    constructor(
        public title:string,
        public vendorName: string,
        public vendorId: number,
        public description: string,
        public price: number,
        public categoryName:string,
        public categoryId:number,
        public rating:number,
        public image:string,
        public reviews: ProductReview[]
    ) {}
}