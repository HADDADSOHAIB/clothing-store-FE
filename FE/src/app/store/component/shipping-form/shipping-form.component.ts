import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/models/cart';
import { ShippingInfos } from 'src/app/models/shipping-info';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { Address } from 'src/app/models/address';

@Component({
	selector: 'app-shipping-form',
	templateUrl: './shipping-form.component.html',
	styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
	form: FormGroup;
	cart: Cart;
	shippingInfo: ShippingInfos;
	user: User;
	defaultDate = new Date(2010, 0, 1);
	constructor(
		private formBuilder: FormBuilder,
		private cartService: CartService,
		private orderService: OrderService,
		private accountService: AccountService,
		private router: Router,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.cartService.getCart().pipe(take(1)).subscribe(cart => this.cart = cart);
		this.form = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			addressId: [''],
			firstLine: ['', Validators.required],
			secondLine: [''],
			city: ['', Validators.required],
			state: ['', Validators.required],
			country: ['', Validators.required],
			zipCode: ['', Validators.required]
		});

		this.accountService.getCurrentUser().subscribe(user => this.user = user);
	}

	placeOrder() {
		this.shippingInfo = new ShippingInfos(
			0,
			this.form.get('firstName').value,
			this.form.get('lastName').value,
			this.form.get('phoneNumber').value,
			this.form.get('firstLine').value,
			this.form.get('secondLine').value,
			this.form.get('city').value,
			this.form.get('state').value,
			this.form.get('country').value,
			this.form.get('zipCode').value
		);

		this.orderService.placeOrder(new Order(0,
			this.user.userEmail,
			this.cart.items.map(cartItem => new OrderItem(0,
				cartItem.product.productId,
				cartItem.product.productName,
				cartItem.itemQuantity,
				cartItem.itemPrice)),
			this.shippingInfo, new Date(), this.defaultDate,
			this.defaultDate, this.defaultDate, this.defaultDate,
			this.defaultDate)).pipe(take(1)).subscribe(order => {
				console.log(order);
				this.snackBar.open('Order placed succes', 'Ok', {duration: 2000});
				this.router.navigate(['']);
			}, error => {
				console.log(error);
				this.snackBar.open('Error try later', 'Ok', {duration: 2000});
			});

		const address = new Address(
			parseInt(this.form.get('addressId').value),
			this.form.get('firstLine').value,
			this.form.get('secondLine').value,
			this.form.get('city').value,
			this.form.get('state').value,
			this.form.get('country').value,
			this.form.get('zipCode').value
		);

		if (!this.isAddressExistInTheAccount(address)) {
			address.id = 0;
		}

		// add the address to the account
	}

	updateForm($event) {
		const addressId = $event.value;
		const index = this.user.addresses.findIndex(address => address.id === addressId);
		this.form.get('addressId').setValue(addressId);
		this.form.get('firstLine').setValue(this.user.addresses[index].firstLine);
		this.form.get('secondLine').setValue(this.user.addresses[index].secondLine);
		this.form.get('city').setValue(this.user.addresses[index].city);
		this.form.get('state').setValue(this.user.addresses[index].state);
		this.form.get('country').setValue(this.user.addresses[index].country);
		this.form.get('zipCode').setValue(this.user.addresses[index].zipCode);
	}
	goStore() {
		this.router.navigate(['store']);
	}

	goCart() {
		this.router.navigate(['store/checkout']);
	}
	isAddressExistInTheAccount(address: Address) {
		let isAddressExist = false;
		for (const addr of this.user.addresses) {
			if (addr.city.toLowerCase().trim() === address.city.toLowerCase().trim()) {
			if (addr.country.toLowerCase().trim() === address.country.toLowerCase().trim()) {
			if (addr.firstLine.toLowerCase().trim() === address.firstLine.toLowerCase().trim()) {
			if (addr.state.toLowerCase().trim() === address.state.toLowerCase().trim()) {
			if (addr.zipCode.toLowerCase().trim() === address.zipCode.toLowerCase().trim()) {
			isAddressExist = true;
			}
			}
			}
			}
			}
		}
		return isAddressExist;
	}

}
