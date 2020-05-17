import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreFrontComponent } from './component/store-front/store-front.component';
import { StoreComponent } from './store.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { UserGuard } from '../guards/user-guard/user.guard';


const routes: Routes = [
  {
    path: '', component: StoreComponent, children: [
      {
        path: '', component: StoreFrontComponent
      },
      {
        path: 'product/:id', component: ProductFormComponent
      },
      {
        path: 'checkout', component: CheckOutComponent, canActivate: [UserGuard]
      },
      {
        path: 'shipping', component: ShippingFormComponent, canActivate: [UserGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
