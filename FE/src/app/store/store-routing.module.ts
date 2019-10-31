import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreFrontComponent } from './component/store-front/store-front.component';
import { StoreComponent } from './store.component';


const routes: Routes = [
  {
    path: '', component: StoreComponent, children: [
      {
        path: '', component: StoreFrontComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
