import { User } from './user';

export class ProductReview {
  constructor(
    public id: number,
    public userId: number,
    public rating: number,
    public review: string,
    public productId: number
  ) {}
}
