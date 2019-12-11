import { User } from './user';

export class ProductReview{
    constructor(
        public id: number,
        public user: User,
        public userRating: number,
        public userReview: string,
        public productId: number
    ){}
}