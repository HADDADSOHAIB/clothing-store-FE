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

  totalPrice() {
    let sum = 0;
    this.items.forEach((item) => (sum += item.quantity * item.price));
    return sum;
  }

  itemInCart(id: number) {
    return !!this.items.find(item => item.productId === id);
  }

  addItem(item: CartItem) {
    const exist = !!this.items.find(el => el.id === item.id);
    if(!exist) this.items.push(item);
  }

  private deleteItem(id: number) {
    const index = this.items.findIndex(el => el.id === id);
    if(index !== -1) this.items.splice(index, 1);
  }

  itemIdByProduct(productId: number) {
    const item = this.items.find(el => el.productId === productId);
    if(item) return item.id;
    return 0;
  }

  increase(id: number) {
    const item = this.items.find(el => el.id === id);
    if(item) item.quantity += 1;
  }

  decrease(id: number) {
    const item = this.items.find(el => el.id === id);
    if(item && item.quantity !== 1) item.quantity -= 1;
    else if(item && item.quantity === 1) this.deleteItem(item.id);
  }
}
