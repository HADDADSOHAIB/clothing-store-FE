import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order-service/order.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Order>([]);
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.currentUser$.subscribe((user) => {
      if (user) {
        this.orderService
          .getOrders(user.id)
          .pipe(take(1))
          .subscribe((res) => {
            this.dataSource = new MatTableDataSource<Order>(res);
            this.dataSource.paginator = this.paginator;
            this.orders = res;
          });
      } else {
        this.dataSource = new MatTableDataSource<Order>([]);
        this.dataSource.paginator = this.paginator;
        this.orders = [];
      }
    });
  }

  goOrder(id: number) {
    this.router.navigate(['user', 'myorders', id]);
  }
}
