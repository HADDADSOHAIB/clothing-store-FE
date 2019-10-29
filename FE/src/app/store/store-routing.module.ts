import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreFrontComponent } from './component/store-front/store-front.component';


const routes: Routes = [
  {
    path:"",
    component:StoreFrontComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
