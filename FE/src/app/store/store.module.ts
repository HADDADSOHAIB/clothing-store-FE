import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { StoreFrontComponent } from './component/store-front/store-front.component';
import { ProductsService } from './service/products-service/products.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductCardComponent } from './component/product-card/product-card.component';


@NgModule({
  declarations: [StoreFrontComponent, ProductCardComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,

    FlexLayoutModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    ProductsService,
    HttpClient
  ]

})
export class StoreModule { }

