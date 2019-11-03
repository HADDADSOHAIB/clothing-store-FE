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
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from './service/cart-service/cart.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

import { StoreHeaderComponent } from './component/store-header/store-header.component';
import { StoreComponent } from './store.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { ActivatedRoute } from '@angular/router';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { MatInputModule } from '@angular/material/input';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';


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

    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [
    ProductsService,
    HttpClient,
    CartService
  ],
  entryComponents:[
    ProductFormComponent
  ]
})
export class StoreModule { }

