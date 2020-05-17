import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderComponent } from './admin-navbar.component';
import { DebugElement } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Router } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductManagementFormComponent } from '../product-management-form/product-management-form.component';
import { AdminComponent } from '../../admin.component';
import { ManageStoreComponent } from '../manage-store/manage-store.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { TitleDescriptionPipe } from '../../pipes/title-description.pipe';
import { UserListComponent } from '../user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../../admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { RoleService } from 'src/app/services/role-service/role.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { HttpClient } from 'selenium-webdriver/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminHeaderComponent', () => {
  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;
  let debugElement: DebugElement;
  let cart: CartService;
  let router: Router;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ProductListComponent,
      ProductManagementFormComponent,
      AdminHeaderComponent,
      AdminComponent,
      ManageStoreComponent,
      OrdersListComponent,
      CategoryFormComponent,
      TitleDescriptionPipe,
      UserListComponent
    ],
    imports: [
      CommonModule,
      AdminRoutingModule,
      RouterTestingModule,
      SharedModule.forRoot()
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
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    compiled = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('The component is created', () => {
    expect(component).toBeTruthy();
  });
});
