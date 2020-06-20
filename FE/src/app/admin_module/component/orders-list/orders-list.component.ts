import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { pipe, BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order-service/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Order>([]);

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService
      .getOrders(null)
      .pipe(take(1))
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<Order>(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  goOrder(id: number) {
    this.router.navigate(['admin', 'order', id]);
  }
}
