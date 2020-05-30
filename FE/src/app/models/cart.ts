import { CartItem } from './cartItem';

export class Cart {
  constructor(public id: String, public userId: string, public items: CartItem[]) {}

  itemCount(id: number) {
    const index = this.items.findIndex((item) => item.productId === id);
    if (index === -1) {
      return 0;
    }
    return this.items[index].quantity;
  }

  totalCount() {
    let total = 0;
    this.items.forEach((item) => (total += item.quantity));
    return total;
  }

  indexByProduct(id) {
    return this.items.findIndex((item) => item.productId === id);
  }

  totalPrice() {
    let sum = 0;
    this.items.forEach((item) => (sum += item.quantity * item.price));
    return sum;
  }
}
