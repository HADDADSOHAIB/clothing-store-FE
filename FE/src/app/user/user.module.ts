import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from './component/user-header/user-header.component';
import { AccountComponent } from './component/account/account.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';


@NgModule({
  declarations: [UserComponent, UserHeaderComponent, AccountComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
