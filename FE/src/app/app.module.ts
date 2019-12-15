import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart-service/cart.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from './services/account-service/account.service';
import { AuthService } from './services/auth-service/auth.service';
import { CategoryService } from './services/category-service/category.service';
import { OrderService } from './services/order-service/order.service';
import { ProductsService } from './services/products-service/products.service';
import { ReviewService } from './services/review-service/review.service';
import { RoleService } from './services/role-service/role.service';
import { AuthInterceptor } from './shared/interceptors/http.interceptor';
import { SidenavService } from './services/sidenav-service/sidenav.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    CategoryService,
    OrderService,
    ProductsService,
    ReviewService,
    RoleService,
    AccountService,
    HttpClient,
    CartService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }