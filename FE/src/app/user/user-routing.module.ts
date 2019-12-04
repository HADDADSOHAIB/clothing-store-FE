import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { User } from '../shared/Models/user';
import { UserComponent } from './user.component';
import { AccountComponent } from './component/account/account.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { OrderInfosComponent } from '../shared/Component/order-infos/order-infos.component';


const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[
      {
        path:'account',
        component:AccountComponent
      },
      {
        path:'myorders/:id',
        component:OrderInfosComponent
      },
      {
        path:'myorders',
        component:MyOrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
