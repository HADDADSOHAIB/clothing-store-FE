import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreFrontComponent } from './component/store-front/store-front.component';
import { StoreComponent } from './store.component';
import { ProductFormComponent } from './component/product-form/product-form.component';


const routes: Routes = [
  {
    path: '', component: StoreComponent, children: [
      {
        path: '', component: StoreFrontComponent
      },
      {
        path: 'product/:id', component: ProductFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
