import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductListComponent } from './component/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductManagementFormComponent } from './component/product-management-form/product-management-form.component';
import { CategoryService } from './service/category-service/category.service';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { AdminComponent } from './admin.component';
import { ManageStoreComponent } from './component/manage-store/manage-store.component';
import { OrdersListComponent } from './component/orders-list/orders-list.component';
import { OrderFormComponent } from './component/order-form/order-form.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { TitleDescriptionPipe } from './pipes/title-description.pipe';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductManagementFormComponent,
    AdminHeaderComponent,
    AdminComponent,
    ManageStoreComponent,
    OrdersListComponent,
    OrderFormComponent,
    CategoryFormComponent,
    TitleDescriptionPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule.forRoot()
  ],
  providers:[
    CategoryService
  ]
})
export class AdminModule { }
