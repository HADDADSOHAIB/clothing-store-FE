import { ProductReview } from './product-review';
import { Category } from './category';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public categories: Category[],
    public rating: number,
    public images: string[],
    public reviews: ProductReview[],
    public quantity: number
  ) {}

  getReviewsByNumberOfStarsGiving(numberOfStars: number) {
    return this.reviews.filter((review) => review.userRating === numberOfStars);
  }
}
