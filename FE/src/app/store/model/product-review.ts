import { User } from './user';

export class ProductReview{
    constructor(
        public user: User,
        public userRating: number,
        public userReview: string
    ){}
}