import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { OrderService } from 'src/app/shared/services/order-service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[]=[];
  displayedColumns: string[] = ['OrderDate', 'OrderedBy','Status','Options'];
  defaultDate=new Date(2010,0,1);
  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders=>{
      this.orders=orders.map(order=>new Order(order.id, order.userEmail, order.orderItems,
        order.shippingInfo, new Date(order.orderDate), new Date(order.processedDate), 
        new Date(order.inRouteDate), new Date(order.deliveryDate), 
        new Date(order.deliveryConfirmationDate), new Date(order.cancelationDate)));
      console.log(orders);
    });
  }

  goOrder(id:number){
    this.router.navigate(["admin/order/"+id]);
  }

}
