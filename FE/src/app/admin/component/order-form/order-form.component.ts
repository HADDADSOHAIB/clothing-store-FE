import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/Operators';
import { OrderService } from 'src/app/shared/services/order-service/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  order: Order;
  id:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(params=>{
      this.id=parseInt(params.get("id"));
      this.orderService.getOrder(this.id).pipe(take(1)).subscribe(ord=>this.order=ord);
    });
  }

}
