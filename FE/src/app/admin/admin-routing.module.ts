import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductManagementFormComponent } from './component/product-management-form/product-management-form.component';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { ManageStoreComponent } from './component/manage-store/manage-store.component';
import { AdminComponent } from './admin.component';
import { OrdersListComponent } from './component/orders-list/orders-list.component';
import { OrderInfosComponent } from '../shared/Component/order-infos/order-infos.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { CategoryGuard } from './guard/category-guard/category.guard';
import { ProductGuard } from './guard/add-product-guard/product.guard';


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
        component:CategoryFormComponent,
        canActivate:[CategoryGuard]
      },
      {
        path:"product/:id",
        component:ProductManagementFormComponent,
        canActivate:[ProductGuard]
      },
      {
        path:"product/new",
        component:ProductManagementFormComponent,
        canActivate:[ProductGuard]
      },
      {
        path:"products",
        component:ProductListComponent,
        canActivate:[ProductGuard]
      },
      {
        path:"order/:id",
        component:OrderInfosComponent
      },
      {
        path:"orders",
        component:OrdersListComponent
      },
      {
        path:"users",
        component:UserListComponent
      },
      {
        path:"manage",
        component:ManageStoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
