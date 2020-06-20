import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ShippingInfos } from 'src/app/models/shipping-info';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnChanges {
  @Input() order: Order;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.order && changes.order) {
      this.order.orderDate = this.order.orderDate ? new Date(this.order.orderDate) : null;
      this.order.cancelationDate = this.order.cancelationDate ? new Date(this.order.cancelationDate) : null;
      this.order.deliveryConfirmationDate = this.order.deliveryConfirmationDate
        ? new Date(this.order.deliveryConfirmationDate)
        : null;
      this.order.deliveryDate = this.order.deliveryDate ? new Date(this.order.deliveryDate) : null;
      this.order.inRouteDate = this.order.inRouteDate ? new Date(this.order.inRouteDate) : null;
      this.order.processedDate = this.order.processedDate ? new Date(this.order.processedDate) : null;
    }
  }
}
