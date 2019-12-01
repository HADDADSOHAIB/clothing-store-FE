import { ProductReview } from './product-review';
import { Category } from './category';

export class Product{
    productId: number;
    productName:string;
    description: string;
    price: number;
    categories: Category[]=[];
    rating:number=2.5;
    image:string;
    reviews: ProductReview[]=[];
    quantity: number;
    
    constructor() {
        this.productId=0;
        this.productName="";
        this.description="";
        this.image="";
        this.price=0;
        this.rating=0;
        this.quantity=0;
    }

    getReviewsByNumberOfStarsGiving(numberOfStars:number){
        return this.reviews.filter(review=>review.userRating===numberOfStars);
    }
}