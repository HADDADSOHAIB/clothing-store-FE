import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { OrderService } from 'src/app/shared/services/order-service/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  order: Order=new Order(0,'',[],null);
  id:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(params=>{
      this.id=parseInt(params.get("id"));
      this.orderService.getOrder(this.id).pipe(take(1)).subscribe(ord=>{
        this.order=new Order(ord.id,ord.userEmail,ord.orderItems,ord.shippingInfo,ord.orderDate,ord.isProcessed);
        console.log(ord);
      });
    });
  }

  changeStatus(){
    this.order.isProcessed=true;
    this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order=>{
      console.log("succes")
    },error=>{
      console.log(error);
    })
  }

}
