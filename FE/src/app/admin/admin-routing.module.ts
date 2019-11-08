import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductManagementFormComponent } from './component/product-management-form/product-management-form.component';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { ManageStoreComponent } from './component/manage-store/manage-store.component';
import { AdminComponent } from './admin.component';


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
        path:"product/:id",
        component:ProductManagementFormComponent
      },
      {
        path:"products",
        component:ProductListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
