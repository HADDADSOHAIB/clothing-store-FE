import { ProductReview } from './product-review';
import { Category } from './category';

export class Product {
		productId: number;
		productName: string;
		description: string;
		price: number;
		categories: Category[] = [];
		rating = 2.5;
		images: String[];
		reviews: ProductReview[] = [];
		quantity: number;

		constructor() {
				this.productId = 0;
				this.productName = '';
				this.description = '';
				this.images = [];
				this.price = 0;
				this.rating = 5;
				this.quantity = 0;
		}

		getReviewsByNumberOfStarsGiving(numberOfStars: number) {
				return this.reviews.filter(review => review.userRating === numberOfStars);
		}
}
