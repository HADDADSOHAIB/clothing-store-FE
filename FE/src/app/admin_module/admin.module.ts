import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductListComponent } from './component/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { NewProductComponent } from './component/new-product/new-product.component';
import { AdminHeaderComponent } from './component/admin-navbar/admin-navbar.component';
import { AdminComponent } from './admin.component';
import { ManageStoreComponent } from './component/manage-store/manage-store.component';
import { OrdersListComponent } from './component/orders-list/orders-list.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { TitleDescriptionPipe } from './pipes/title-description.pipe';
import { UserListComponent } from './component/user-list/user-list.component';

@NgModule({
  declarations: [
    ProductListComponent,
    NewProductComponent,
    AdminHeaderComponent,
    AdminComponent,
    ManageStoreComponent,
    OrdersListComponent,
    CategoryFormComponent,
    TitleDescriptionPipe,
    UserListComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule.forRoot()],
  providers: [],
})
export class AdminModule {}
