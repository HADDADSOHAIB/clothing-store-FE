import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { OrderService } from 'src/app/shared/services/order-service/order.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[]=[];
  displayedColumns: string[] = ['OrderDate', 'OrderedBy','Status','Options'];
  defaultDate=new Date(2010,0,1);

  currentPage=1;

  sort:string[]=[];
  sortDirection:Map<string,string>=new Map<string,string>();
  selectedSortElement:string='';

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sortDirection.set("userEmail","asc");
    this.sortDirection.set("orderDate","asc");
    

    this.orderService.getOrders(0,10).subscribe(orders=>{
      this.orders=orders.map(order=>new Order(order.id, order.userEmail, order.orderItems,
        order.shippingInfo, new Date(order.orderDate), new Date(order.processedDate), 
        new Date(order.inRouteDate), new Date(order.deliveryDate), 
        new Date(order.deliveryConfirmationDate), new Date(order.cancelationDate)));
    });
  }

  goOrder(id:number){
    this.router.navigate(["admin/order/"+id]);
  }

  // changeItemsPerPage($event:string){
  //   this.itemsPerPage=parseInt($event);
  //   this.currentPage=1;
  //   this.productService.loadProducts(this.itemsPerPage,0);
  // }

  // changePageNumber($event:string){
  //   this.currentPage=parseInt($event);
  //   this.productService.loadProducts(this.itemsPerPage,this.currentPage-1);
  // }

  sortBy(sortElement:string){
    ['userEmail','orderDate'].forEach(columnTitle=>{
      if(columnTitle.toLowerCase()===sortElement.toLowerCase()){
        this.sortDirection.get(sortElement)==='asc'?
          this.sortDirection.set(sortElement,'desc'):this.sortDirection.set(sortElement,'asc');
        this.sort=[];
        this.sort.push(sortElement);
        this.sort.push(this.sortDirection.get(sortElement));
        this.currentPage=1;
        this.orderService.getOrders(0,10,this.sort).pipe(take(1)).subscribe(orders=>{
          this.orders=orders.map(order=>new Order(order.id, order.userEmail, order.orderItems,
            order.shippingInfo, new Date(order.orderDate), new Date(order.processedDate), 
            new Date(order.inRouteDate), new Date(order.deliveryDate), 
            new Date(order.deliveryConfirmationDate), new Date(order.cancelationDate)));
        });
        this.selectedSortElement=sortElement;
      }
    })
  }
}
