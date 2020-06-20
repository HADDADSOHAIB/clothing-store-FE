import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { ShippingInfos } from 'src/app/models/shipping-info';
import { OrderService } from 'src/app/services/order-service/order.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-infos',
  templateUrl: './order-infos.component.html',
  styleUrls: ['./order-infos.component.scss'],
})
export class OrderInfosComponent implements OnInit {
  order: Order;
  currentUser: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params) => {
      const id = parseInt(params.get('id'));
      this.orderService
        .getOrder(id)
        .pipe(take(1))
        .subscribe((order) => (this.order = order));
    });

    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.currentUser = user));
  }

  adminOption() {
    if (this.order.status() === 'Proccessed') {
      return 'Send Order';
    } else if (this.order.status() === 'In Route') {
      return 'Deliver Order';
    } else if (this.order.status() === 'Ordered') {
      return 'Process Order';
    } else {
      return false;
    }
  }

  userOption() {
    if (this.order.status() === 'Delivered') {
      return 'Confirm Delivery';
    } else {
      return false;
    }
  }

  updateOrder(role) {
    const newOrder = { ...this.order };
    if (role === 'admin') {
      if (this.order.status() === 'Proccessed') {
        newOrder.inRouteDate = new Date();
      } else if (this.order.status() === 'In Route') {
        newOrder.deliveryDate = new Date();
      } else if (this.order.status() === 'Ordered') {
        newOrder.processedDate = new Date();
      }
    } else if (role === 'user') {
      if (this.order.status() === 'Delivered') {
        newOrder.deliveryConfirmationDate = new Date();
      }
    }

    this.orderService
      .updateOrder(newOrder as Order)
      .pipe(take(1))
      .subscribe(
        () => {
          this.snackBar.open('Order updated', 'Ok', { duration: 4000 });
          const {
            id,
            userId,
            orderItems,
            shippingInfos,
            orderDate,
            processedDate,
            inRouteDate,
            deliveryDate,
            deliveryConfirmationDate,
            cancelationDate,
          } = newOrder;
          this.order = new Order(
            id,
            userId,
            orderItems,
            shippingInfos,
            orderDate,
            processedDate,
            inRouteDate,
            deliveryDate,
            deliveryConfirmationDate,
            cancelationDate
          );
        },
        () => {
          this.snackBar.open('Error, try later', 'Ok', { duration: 4000 });
        }
      );
  }

  cancelOrder() {
    if (confirm('Are you sure about canceling the order')) {
      this.order.cancelationDate = new Date();
      this.orderService
        .updateOrder(this.order)
        .pipe(take(1))
        .subscribe(
          () => {
            this.snackBar.open('Order canceled', 'Ok', { duration: 4000 });
          },
          () => {
            this.snackBar.open('Error, try later', 'Ok', { duration: 4000 });
            this.order.cancelationDate = null;
          }
        );
    }
  }
}
