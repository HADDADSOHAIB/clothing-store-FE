import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckOutComponent } from './check-out.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartService } from '../../service/cart-service/cart.service';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreRoutingModule } from '../../store-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from '../../store.component';
import { StoreFrontComponent } from '../store-front/store-front.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { StoreHeaderComponent } from '../store-header/store-header.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { ProductsService } from '../../../core/services/products-service/products.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cart } from 'src/app/core/Models/cart';
import { CartItem } from 'src/app/core/Models/CartItem';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;
  let debugElement: DebugElement;
  let cart:CartService;
  let router: Router;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StoreFrontComponent, 
        ProductCardComponent, 
        PaginatorComponent,
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
    compiled=debugElement.nativeElement;

    cart=debugElement.injector.get(CartService);
    router=debugElement.injector.get(Router);

    spyOn(cart,'cartStatus').and.returnValue(new BehaviorSubject(new Cart(1,"",[
      new CartItem(1,5,'product1',1),
      new CartItem(2,2,'product2',2),
      new CartItem(3,1,'product3',3)
    ])));
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('the component is created', () => {
    expect(component).toBeTruthy();
  });

  it('changeQuantity(id,quantity) should log an error when provided with a negative quantity', () => {
    spyOn(window.console, 'log');
    component.changeQuantity(1,'-1');
    expect(window.console.log).toHaveBeenCalled();
  });

  it('changeQuantity(id,quantity) should chqnge the quantity when provided with a positive or zero quantity', () => {
    component.changeQuantity(1,'3');
    expect(component.cart.items[0].itemQuantity).toEqual(3);
  });

  it('goShipping should route toword store/shipping when called', () => {
    component.goShipping();
    expect(router.navigate).toHaveBeenCalledWith(["store/shipping"]);
  });

  it('goShipping should route toword store/shipping when called', () => {
    component.goStore();
    expect(router.navigate).toHaveBeenCalledWith(["store"]);
  });

  it('ngOnInit() should call cartStatus()', () => {
    expect(cart.cartStatus).toHaveBeenCalled();
  });
  
  it('The component should render a table with the number of rows for the items in cart', () => {
    let rows=compiled.querySelectorAll("tr.mat-row");
    expect (rows.length).toEqual(component.cart.items.length);
  });

  it('Button go-strore should call function goStore when clicked', async(() => {
    spyOn(component,'goStore');
    let button=compiled.querySelector("button.go-store");
    button.click();
    fixture.whenStable().then(()=>expect(component.goStore).toHaveBeenCalled());
  }));

  it('Button go-shipping should call function goShipping when clicked', async(() => {
    spyOn(component,'goShipping');
    let button=compiled.querySelector("button.go-shipping");
    button.click();
    fixture.whenStable().then(()=>expect(component.goShipping).toHaveBeenCalled());
  }));
});
