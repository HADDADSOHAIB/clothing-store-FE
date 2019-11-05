import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { StoreFrontComponent } from './component/store-front/store-front.component';
import { ProductsService } from './service/products-service/products.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { PaginatorComponent } from './component/paginator/paginator.component';
import { CartService } from './service/cart-service/cart.service';

import { ReactiveFormsModule } from '@angular/forms';
import { StoreHeaderComponent } from './component/store-header/store-header.component';
import { StoreComponent } from './store.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    StoreFrontComponent, 
    ProductCardComponent, 
    PaginatorComponent,
    StoreHeaderComponent,
    StoreComponent,
    ProductFormComponent,
    CheckOutComponent,
    ShippingFormComponent
    
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    SharedModule
  ],
  providers: [
    ProductsService,
    HttpClient,
    CartService
  ]
})
export class StoreModule { }
