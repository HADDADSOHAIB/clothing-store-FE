import { CartItem } from './CartItem';

export class Cart {

		constructor(
				public cartId: String,
				public userEmail: string,
				public items: CartItem[]
		) {}

		itemCount(id: number) {
				const index = this.items.findIndex(item => item.product.id === id);
				if (index === -1) {
						return 0;
				}
				return this.items[index].itemQuantity;

		}

		totalCount() {
				let total = 0;
				this.items.forEach(item => total += item.itemQuantity);
				return total;
		}

		indexByProduct(id) {
				return this.items.findIndex(item => item.product.id === id);
		}

		totalPrice() {
				let sum = 0;
				this.items.forEach(item => sum += item.itemQuantity * item.itemPrice);
				return sum;
		}
}
