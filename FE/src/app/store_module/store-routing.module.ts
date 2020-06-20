import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { UserGuard } from '../guards/user-guard/user.guard';
import { ProductDetails } from './component/product-details/product-details.component';

const routes: Routes = [
  {
    path: 'products',
    component: StoreComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetails,
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
  },
  {
    path: 'shipping',
    component: ShippingFormComponent,
  },
  {
    path: '**',
    component: StoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
