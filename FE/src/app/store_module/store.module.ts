import { NgModule } from '@angular/core';
import { StoreRoutingModule } from './store-routing.module';

import { ProductCardComponent } from './component/product-card/product-card.component';

import { StoreComponent } from './store.component';
import { ProductDetails } from './component/product-details/product-details.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { SharedModule } from '../shared_module/shared.module';

import { HeaderFormaterPipe } from './pipes/header-formater/header-formater.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { CartActionsComponent } from './component/cart-actions/cart-actions.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    ProductCardComponent,
    StoreComponent,
    ProductDetails,
    CheckOutComponent,
    ShippingFormComponent,
    HeaderFormaterPipe,
    CartActionsComponent,
  ],
  imports: [StoreRoutingModule, SharedModule.forRoot(), MatDialogModule, MatCarouselModule.forRoot()],
  providers: [],
})
export class StoreModule {}
