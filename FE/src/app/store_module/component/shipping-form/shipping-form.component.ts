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
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      firstLine: ['', Validators.required],
      secondLine: [''],
      city: ['', Validators.required],
      state: [''],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  placeOrder() {
    if (this.form.valid) {
      const { firstName, lastName, phone, firstLine, secondLine, city, state, country, zipCode } = this.form.value;
      const shippingInfo = new ShippingInfos(
        firstName,
        lastName,
        phone,
        firstLine,
        secondLine,
        city,
        state,
        country,
        zipCode
      );
      this.cartService.userCart$.pipe(take(1)).subscribe((cart) => {
        if (!cart.id) {
          this.snackBar.open('You have to be logged in to place an order', 'Ok', { duration: 2000 });
          this.router.navigate(['auth', 'signin']);
        } else if (cart.items.length === 0) {
          this.snackBar.open('You have to buy something to place an order', 'Ok', { duration: 2000 });
          this.router.navigate(['store']);
        } else {
          const order = new Order(
            null,
            cart.userId,
            cart.items.map((item) => new OrderItem(null, item.productId, null, item.name, item.quantity, item.price)),
            shippingInfo,
            new Date(),
            null,
            null,
            null,
            null,
            null
          );
          this.orderService
            .placeOrder(order)
            .pipe(take(1))
            .subscribe(
              () => {
                this.router.navigate(['store']);
                this.snackBar.open('Order placed successfully', 'Ok', { duration: 2000 });
                cart.clear();
                this.cartService.userCart$.next(cart);
                this.cartService.clearCart(cart.id).pipe(take(1)).subscribe();
              },
              () => {
                this.snackBar.open('Error, please try later', 'Ok', { duration: 2000 });
              }
            );
        }
      });
    } else {
      this.snackBar.open('Please fill the required field', 'Ok', { duration: 2000 });
    }
  }
}
