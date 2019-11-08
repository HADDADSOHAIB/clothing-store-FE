import { ProductReview } from './product-review';
import { Category } from './category';

export class Product{
    productId: number;
    productName:string;
    description: string;
    price: number;
    category: Category;
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
        this.category=new Category(0,"");
        this.quantity=0;
    }

    setProductId(id:number){
        this.productId=id;
        return this;
    }
    setProductName(name:string){
        this.productName=name;
        return this;
    }
    setDescription(desc:string){
        this.description=desc;
        return this;
    }
    setPrice(price:number){
        this.price=price;
        return this;
    }
    setCategory(category: Category){
        this.category=category;
        return this;
    }
    setImage(img:string){
        this.image=img;
        return this;
    }
    setNumber(quantity:number){
        this.quantity=quantity;
        return this;
    }
}