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
import { ProductService } from './services/product-service/product.service';
import { ReviewService } from './services/review-service/review.service';
import { RoleService } from './services/role-service/role.service';
import { SidenavService } from './services/sidenav-service/sidenav.service';
import { UploadFilesService } from './services/upload-files-service/upload-files.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    CategoryService,
    OrderService,
    ProductService,
    ReviewService,
    RoleService,
    AccountService,
    HttpClient,
    CartService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    SidenavService,
    UploadFilesService,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
