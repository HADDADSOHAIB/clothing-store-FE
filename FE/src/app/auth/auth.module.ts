import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HttpClient } from '@angular/common/http'


import { AuthService } from './service/auth-service/auth.service';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    HttpClient
  ]
})
export class AuthModule { }