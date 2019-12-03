import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { OrderService } from 'src/app/shared/services/order-service/order.service';
import { ShippingInfos } from 'src/app/shared/Models/shipping-info';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderInfosComponent implements OnInit {
  order: Order=new Order(0,'',[],new ShippingInfos(0,"","","","","","","","",""),
    new Date(2010,0,1), new Date(2010,0,1),new Date(2010,0,1),new Date(2010,0,1),
    new Date(2010,0,1),new Date(2010,0,1));
  id:number;
  inAdminSection:boolean=false;
  defaultDate=new Date(2010,0,1);
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(params=>{
      this.id=parseInt(params.get("id"));
      this.getOrder();
    });
    
    if(this.router.url.includes('admin'))
      this.inAdminSection=true;
  }

  private getOrder() {
    this.orderService.getOrder(this.id).pipe(take(1)).subscribe(ord => {
      this.order = new Order(ord.id, ord.userEmail, ord.orderItems,
        ord.shippingInfo, new Date(ord.orderDate), new Date(ord.processedDate), 
        new Date(ord.inRouteDate), new Date(ord.deliveryDate), 
        new Date(ord.deliveryConfirmationDate), new Date(ord.cancelationDate), 
        ord.isProcessed, ord.isCanceled);
    });
  }

  process(){
    this.order.processedDate=new Date();
    this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order=>{
      console.log("succes")

    },error=>{
      console.log(error);
    });
  }

  send(){
    this.order.inRouteDate=new Date();
    this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order=>{
      console.log("succes")
      
    },error=>{
      console.log(error);
    });
  }

  delivered(){
    this.order.deliveryDate=new Date();
    this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order=>{
      console.log("succes")
      
    },error=>{
      console.log(error);
    });
  }

  cancel(){
    this.order.cancelationDate=new Date();
    this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order=>{
      console.log("succes")
      
    },error=>{
      console.log(error);
    });
  }

  confirmDelivery(){
    this.order.deliveryConfirmationDate=new Date();
    this.orderService.UpdateOrder(this.order).pipe(take(1)).subscribe(order=>{
      console.log("succes")
      
    },error=>{
      console.log(error);
    });
  }
}
