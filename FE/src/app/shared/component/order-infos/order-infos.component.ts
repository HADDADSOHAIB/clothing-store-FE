import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { ShippingInfos } from 'src/app/models/shipping-info';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-order-infos',
  templateUrl: './order-infos.component.html',
  styleUrls: ['./order-infos.component.scss'],
})
export class OrderInfosComponent implements OnInit {
  order: Order;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private orderService: OrderService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params) => {
      const id = parseInt(params.get('id'));
      this.orderService
        .getOrder(id)
        .pipe(take(1))
        .subscribe((order) => (this.order = order));
    });
  }

  private getOrder() {
    // this.orderService.getOrder(this.id).pipe(take(1)).subscribe(ord => {
    // 	this.order = new Order(ord.id, ord.userId, ord.orderItems,
    // 		ord.shippingInfo, new Date(ord.orderDate), new Date(ord.processedDate),
    // 		new Date(ord.inRouteDate), new Date(ord.deliveryDate),
    // 		new Date(ord.deliveryConfirmationDate), new Date(ord.cancelationDate));
    // 	console.log(this.order);
    // });
  }

  process() {
    this.order.processedDate = new Date();
    // this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order => {
    // 	console.log('succes');

    // }, error => {
    // 	console.log(error);
    // });
  }

  send() {
    this.order.inRouteDate = new Date();
    // this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order => {
    // 	console.log('succes');

    // }, error => {
    // 	console.log(error);
    // });
  }

  delivered() {
    this.order.deliveryDate = new Date();
    // this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order => {
    // 	console.log('succes');

    // }, error => {
    // 	console.log(error);
    // });
  }

  cancel() {
    this.order.cancelationDate = new Date();
    // this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order => {
    // 	console.log('succes');

    // }, error => {
    // 	console.log(error);
    // });
  }

  confirmDelivery() {
    this.order.deliveryConfirmationDate = new Date();
    // this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order => {
    // 	console.log('succes');

    // }, error => {
    // 	console.log(error);
    // });
  }
}
