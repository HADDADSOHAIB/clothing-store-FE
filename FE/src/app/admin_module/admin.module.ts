import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductListComponent } from './component/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { NewProductComponent } from './component/new-product/new-product.component';
import { AdminHeaderComponent } from './component/admin-navbar/admin-navbar.component';
import { AdminComponent } from './admin.component';
import { OrdersListComponent } from './component/orders-list/orders-list.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { TitleDescriptionPipe } from './pipes/title-description.pipe';

@NgModule({
  declarations: [
    ProductListComponent,
    NewProductComponent,
    AdminHeaderComponent,
    AdminComponent,
    OrdersListComponent,
    CategoryFormComponent,
    TitleDescriptionPipe,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule.forRoot()],
  providers: [],
})
export class AdminModule {}
