import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckOutComponent } from './check-out.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreRoutingModule } from '../../store-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from '../../store.component';
import { StoreFrontComponent } from '../store-front/store-front.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { StoreHeaderComponent } from '../store-navbar/store-navbar.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/CartItem';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;
  let debugElement: DebugElement;
  let cart: CartService;
  let router: Router;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreFrontComponent,
        ProductCardComponent,
        StoreHeaderComponent,
        StoreComponent,
        ProductFormComponent,
        CheckOutComponent,
        ShippingFormComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,

      ],
      providers: [
        ProductsService,
        HttpClient,
        CartService
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    compiled = debugElement.nativeElement;

    cart = debugElement.injector.get(CartService);
    router = debugElement.injector.get(Router);

    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('the component is created', () => {
    expect(component).toBeTruthy();
  });



  it('goShipping should route toword store/shipping when called', () => {
    component.goShipping();
    expect(router.navigate).toHaveBeenCalledWith(['store/shipping']);
  });

  it('goShipping should route toword store/shipping when called', () => {
    component.goStore();
    expect(router.navigate).toHaveBeenCalledWith(['store']);
  });


  it('The component should render a table with the number of rows for the items in cart', () => {
    const rows = compiled.querySelectorAll('tr.mat-row');
    expect (rows.length).toEqual(component.cart.items.length);
  });

  it('Button go-strore should call function goStore when clicked', async(() => {
    spyOn(component, 'goStore');
    const button = compiled.querySelector('button.go-store');
    button.click();
    fixture.whenStable().then(() => expect(component.goStore).toHaveBeenCalled());
  }));

  it('Button go-shipping should call function goShipping when clicked', async(() => {
    spyOn(component, 'goShipping');
    const button = compiled.querySelector('button.go-shipping');
    button.click();
    fixture.whenStable().then(() => expect(component.goShipping).toHaveBeenCalled());
  }));
});
