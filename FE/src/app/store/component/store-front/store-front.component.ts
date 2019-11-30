import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../shared/services/products-service/products.service';

import { CartService } from '../../service/cart-service/cart.service';
import { Product } from 'src/app/shared/Models/product';
import { take } from 'rxjs/operators';

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
    this.productsService.loadAvailableProductCount();
    this.productsService.getAvailableProductCount().subscribe(count=>this.availableProductCount=count);
    this.getProducts(this.itemsPerPage, this.currentPage);
    this.productsService.getProducts().subscribe(response => {
        this.products = [];
        response.forEach(product => this.products.push(product));
      });
  }

  changeItemsPerPage($event){
    this.itemsPerPage=$event;
    this.currentPage=1;
    this.productsService.loadAvailableProductCount();
    this.getProducts(this.itemsPerPage, this.currentPage);
  }

  changePageNumber($event){
    this.currentPage=$event;
    this.getProducts(this.itemsPerPage, this.currentPage);
  }
  
  private getProducts(itemsPerPage: number,pageNumber: number) {
    this.productsService.loadProducts(itemsPerPage,pageNumber-1);
  }

  ngOnDestroy(){
    
  }
}
