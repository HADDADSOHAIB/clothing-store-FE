import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../service/products-service/products.service';
import { take } from 'rxjs/Operators';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart-service/cart.service';
import { Cart } from '../../model/cart';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.scss']
})
export class StoreFrontComponent implements OnInit, OnDestroy {
  
  availableProductCount: number;
  products:Product[]=[];
  itemsPerPage:number=10;
  currentPage: number=1;
  
  constructor(
    private productsService: ProductsService,
    private cartService: CartService 
  ) { }

  ngOnInit() {
    this.productsService.getAvailableProductCount().pipe(take(1))
    .subscribe(count=>this.availableProductCount=count);
    
    this.getProducts(this.itemsPerPage, this.currentPage);
    this.productsService.getProducts().subscribe(response => {
        this.products = [];
        response.forEach(product => this.products.push(product));
      });
  }

  changeItemsPerPage($event){
    this.currentPage=Math.trunc((this.itemsPerPage/$event)*this.currentPage);
    this.itemsPerPage=$event;
    this.getProducts(this.itemsPerPage, this.currentPage);
  }

  changePageNumber($event){
    console.log($event);
    this.currentPage=$event;
    this.getProducts(this.itemsPerPage, this.currentPage);
  }
  
  private getProducts(itemsPerPage: number,pageNumber: number) {
    this.productsService.loadProducts(itemsPerPage,pageNumber);
  }

  ngOnDestroy(){}
}
