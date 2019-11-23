import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { User } from '../shared/Models/user';
import { UserComponent } from './user.component';
import { AccountComponent } from './component/account/account.component';


const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[
      {
        path:'',
        component:AccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
