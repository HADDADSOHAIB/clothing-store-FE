import { Product } from './product';

export class CartItem {
  constructor(
    public id: number,
    public price: number,
    public quantity: number,
    public productId: number,
    public cartId: number
  ) {}
}
