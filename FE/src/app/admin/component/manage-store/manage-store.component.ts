import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order-service/order.service';
import { Order } from 'src/app/shared/Models/order';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.scss']
})
export class ManageStoreComponent implements OnInit {
  ordersNotProcessed:Order[]=[];
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrdersByStatus(0,10,'orderDate').pipe(take(1)).subscribe(orders=>{
      this.ordersNotProcessed=orders.map(order => new Order(order.id, order.userEmail, order.orderItems, order.shippingInfo, new Date(order.orderDate), new Date(order.processedDate), new Date(order.inRouteDate), new Date(order.deliveryDate), new Date(order.deliveryConfirmationDate), new Date(order.cancelationDate)));
    },error=>console.log(error));
  }

}
