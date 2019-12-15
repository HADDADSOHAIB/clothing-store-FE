import { NgModule } from '@angular/core';
import { StoreRoutingModule } from './store-routing.module';
import { StoreFrontComponent } from './component/store-front/store-front.component';

import { ProductCardComponent } from './component/product-card/product-card.component';

import { StoreHeaderComponent } from './component/store-navbar/store-navbar.component';
import { StoreComponent } from './store.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { SharedModule } from '../shared/shared.module';

import { HeaderFormaterPipe } from './pipes/header-formater/header-formater.pipe';
import { MatDialogModule } from '@angular/material/dialog';




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
    
  ]
})
export class StoreModule { }