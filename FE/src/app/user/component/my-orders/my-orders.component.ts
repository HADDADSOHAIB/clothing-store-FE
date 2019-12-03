import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/shared/Models/order-item';
import { OrderService } from 'src/app/shared/services/order-service/order.service';
import { Order } from 'src/app/shared/Models/order';
import { AccountService } from 'src/app/shared/services/account-service/account.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders:Order[]=[];
  displayedColumns: string[] = ['OrderDate', 'OrderedItems','Status','Options'];
  defaultDate=new Date(2010,0,1);
  constructor(
    private orderService: OrderService,
    private accountService:AccountService,
    private router: Router
    ) { }

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.accountService.getCurrentUser().subscribe(user=>{
      if(user.userEmail!=="")
      this.orderService.getOrdersByUser(user.userEmail).pipe(take(1)).subscribe(orders=>{
        this.orders=orders.map(order=>new Order(order.id, order.userEmail, order.orderItems,
          order.shippingInfo, new Date(order.orderDate), new Date(order.processedDate), 
          new Date(order.inRouteDate), new Date(order.deliveryDate), 
          new Date(order.deliveryConfirmationDate), new Date(order.cancelationDate)));
        console.log(this.orders);
        console.log("hola");
      });
    });
  }
}
