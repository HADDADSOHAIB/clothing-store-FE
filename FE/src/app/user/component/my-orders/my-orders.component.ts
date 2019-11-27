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
  displayedColumns: string[] = ['OrderDate', 'OrderedBy','Status','Options'];
  constructor(
    private orderService: OrderService,
    private accountService:AccountService,
    private router: Router
    ) { }

  ngOnInit() {
    this.accountService.getCurrentUser().pipe(take(1)).subscribe(user=>{
      this.orderService.getOrdersByUser(user.userEmail).pipe(take(1)).subscribe(orders=>{
        this.orders=orders;
        console.log(orders);
      });
    });
  }
  
  goOrder(id:number){
    this.router.navigate(["admin/order/"+id]);
  }

}
