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
  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders=>{
      this.orders=orders;
      console.log(orders);
    });
  }

  goOrder(id:number){
    this.router.navigate(["admin/order/"+id]);
  }

}
