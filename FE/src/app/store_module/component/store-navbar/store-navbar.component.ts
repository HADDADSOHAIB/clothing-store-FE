import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';

@Component({
	selector: 'store-navbar',
	templateUrl: './store-navbar.component.html',
	styleUrls: ['./store-navbar.component.scss']
})
export class StoreHeaderComponent implements OnInit {

	cart: Cart;
	user: User;

	constructor(
		private cartService: CartService,
		private sidenavService: SidenavService
		) { }

	ngOnInit() {
		// this.cartService.loadCart();
		// this.cartService.getCart().subscribe(cart => this.cart = cart);
	}

	sidenavClose() {
		this.sidenavService.showSidenave.next(false);
	}
}
