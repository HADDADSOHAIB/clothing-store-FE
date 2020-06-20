import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { NewProductComponent } from './component/new-product/new-product.component';
import { AdminComponent } from './admin.component';
import { OrdersListComponent } from './component/orders-list/orders-list.component';
import { OrderInfosComponent } from '../shared_module/component/order-infos/order-infos.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: 'categories',
        component: CategoryFormComponent,
      },
      {
        path: 'product/:id',
        component: NewProductComponent,
      },
      {
        path: 'product/new',
        component: NewProductComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'order/:id',
        component: OrderInfosComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
