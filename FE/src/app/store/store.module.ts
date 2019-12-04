import { NgModule } from '@angular/core';
import { StoreRoutingModule } from './store-routing.module';
import { StoreFrontComponent } from './component/store-front/store-front.component';

import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { CartService } from './service/cart-service/cart.service';

import { StoreHeaderComponent } from './component/store-header/store-header.component';
import { StoreComponent } from './store.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { SharedModule } from '../shared/shared.module';

import { HeaderFormaterPipe } from './pipes/header-formater/header-formater.pipe';
import { RatingBarComponent } from '../shared/Component/rating-bar/rating-bar.component';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@NgModule({
  declarations: [
    StoreFrontComponent, 
    ProductCardComponent, 
    StoreHeaderComponent,
    StoreComponent,
    ProductFormComponent,
    CheckOutComponent,
    ShippingFormComponent,
    HeaderFormaterPipe
  ],
  imports: [
    StoreRoutingModule,
    SharedModule.forRoot(),
    MatDialogModule
    ],
  entryComponents:[
    ProductFormComponent
  ],
  providers: [
    HttpClient,
    CartService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class StoreModule { }