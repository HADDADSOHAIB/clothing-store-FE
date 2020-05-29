import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { CartItem } from 'src/app/models/CartItem';
import { UploadFilesService } from 'src/app/services/upload-files-service/upload-files.service';

@Component({
	selector: 'product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
	@Input() product: Product;
	cart: Cart;
	itemIndex = -1;
	imageUrl = '';

	constructor(
		private cartService: CartService,
		private router: Router,
		private snackBar: MatSnackBar,
		public dialog: MatDialog,
		private uploadFileService: UploadFilesService
	) {
		}

	ngOnInit() {
		this.uploadFileService.downloadFile(this.product.images[0]).pipe(take(1)).subscribe(reader => {
			reader.addEventListener('load', () => this.imageUrl = reader.result.toString(), false);
		});

		this.cartService.loadCart();
		this.cartService.getCart().subscribe(cart => {
			this.cart = cart;
			this.findOrUpdateIndex();
		});
	}

	addToCart() {
		this.cart.items.push(new CartItem(
			0,
			this.product.price,
			1,
			this.product
		));
		this.cartService.upLoadCart(this.cart);
		this.cartService.updateCart(this.cart);
	}

	increment() {
		this.findOrUpdateIndex();
		if (this.cart.items[this.itemIndex].itemQuantity < this.product.quantity) {
			this.cart.items[this.itemIndex].itemQuantity++;
			this.cartService.upLoadCart(this.cart);
			this.cartService.updateCart(this.cart);
		} else {
			this.snackBar.open('Stock out, there is no more items', 'Ok', {duration: 2000});
		}
	}

	decrement() {
		this.findOrUpdateIndex();
		this.cart.items[this.itemIndex].itemQuantity--;
		if (this.cart.items[this.itemIndex].itemQuantity === 0) {
			this.cart.items.splice(this.itemIndex, 1);
		}
		this.cartService.upLoadCart(this.cart);
		this.cartService.updateCart(this.cart);
	}

	private findOrUpdateIndex() {
		this.itemIndex = this.cart.items.findIndex(item => item.product.id === this.product.id);
	}

	details() {
		// const dialogRef=this.dialog.open(ProductFormComponent, {
		//   height: '85%',
		//   data: this.product
		// });

		this.router.navigate(['store', 'product', this.product.id]);
	}
}
