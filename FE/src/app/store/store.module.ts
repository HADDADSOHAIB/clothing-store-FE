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
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from './component/paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    StoreFrontComponent, 
    ProductCardComponent, 
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,

    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule
  ],
  providers: [
    ProductsService,
    HttpClient
  ]

})
export class StoreModule { }

