export class OrderItem {
		constructor(
				public id: number,
				public productId: number,
				public orderId: number,
				public name: string,
				public quantity: number,
				public price: number
		) {}
}
