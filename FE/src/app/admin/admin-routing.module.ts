import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductManagementFormComponent } from './component/product-management-form/product-management-form.component';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { ManageStoreComponent } from './component/manage-store/manage-store.component';
import { AdminComponent } from './admin.component';
import { OrdersListComponent } from './component/orders-list/orders-list.component';
import { OrderFormComponent } from './component/order-form/order-form.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';


const routes: Routes = [
  {
    path:"",
    component:AdminComponent,
    children:[
      {
        path:"",
        component:ManageStoreComponent
      },
      {
        path:"categories",
        component:CategoryFormComponent
      },
      {
        path:"product/:id",
        component:ProductManagementFormComponent
      },
      {
        path:"product/new",
        component:ProductManagementFormComponent
      },
      {
        path:"products",
        component:ProductListComponent
      },
      {
        path:"order/:id",
        component:OrderFormComponent
      },
      {
        path:"orders",
        component:OrdersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
