import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { User } from '../shared/Models/user';
import { UserComponent } from './user.component';
import { AccountComponent } from './component/account/account.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';


const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[
      {
        path:'',
        component:AccountComponent
      },
      {
        path:'myorders/:id',
        component:OrderDetailsComponent
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
