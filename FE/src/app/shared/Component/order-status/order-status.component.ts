import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ShippingInfos } from 'src/app/models/shipping-info';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit,OnChanges {
  
  @Input() order:Order=new Order(0,'',[],new ShippingInfos(0,"","","","","","","","",""),
    new Date(2010,0,1), new Date(2010,0,1),new Date(2010,0,1),new Date(2010,0,1),
    new Date(2010,0,1),new Date(2010,0,1));
  defaultDate=new Date(2010,0,1);
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.order){
      this.order.orderDate=new Date(this.order.orderDate);
      this.order.cancelationDate=new Date(this.order.cancelationDate);
      this.order.deliveryConfirmationDate=new Date(this.order.deliveryConfirmationDate);
      this.order.deliveryDate=new Date(this.order.deliveryDate);
      this.order.inRouteDate=new Date(this.order.inRouteDate);
      this.order.processedDate=new Date(this.order.processedDate);
      console.log(this.order);
    }
  }
}
