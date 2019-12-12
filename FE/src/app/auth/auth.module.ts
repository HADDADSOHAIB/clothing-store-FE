import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './component/sign-up/sign-up.component';


import { SignInComponent } from './component/sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [
  ]
})
export class AuthModule { }