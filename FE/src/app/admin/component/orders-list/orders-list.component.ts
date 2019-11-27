import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { OrderService } from 'src/app/shared/services/order-service/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  unproccessedOrders: Order[]=[];
  displayedColumns: string[] = ['OrderDate', 'OrderedBy','Status','Options'];
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    // this.orderService.getUnprocessedOrders().subscribe(orders=>this.unproccessedOrders=orders);
  }

}
