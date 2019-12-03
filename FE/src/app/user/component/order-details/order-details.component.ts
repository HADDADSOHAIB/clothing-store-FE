import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { OrderService } from 'src/app/shared/services/order-service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  // order: Order=new Order(0,'',[],null);
  id:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(params=>{
      this.id=parseInt(params.get("id"));
      this.orderService.getOrder(this.id).pipe(take(1)).subscribe(ord=>{
        // this.order=new Order(ord.id,ord.userEmail,ord.orderItems,ord.shippingInfo,ord.orderDate,ord.isProcessed, ord.isCanceled);
        console.log(ord);
      });
    });

  }

  // cancelOrder(){
  //   this.order.isCanceled=true;
  //   this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order=>{
  //     this.snackBar.open("Order Canceled","Ok");
  //   }, error=>{
  //     this.snackBar.open("Error, try later","Ok");
  //     console.log(error);
  //   })
  // }

}