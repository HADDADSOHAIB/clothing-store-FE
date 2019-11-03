import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckOutComponent } from './check-out.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartService } from '../../service/cart-service/cart.service';
import { DebugElement } from '@angular/core';
import { Cart } from '../../model/cart';
import { CartItem } from '../../model/CartItem';
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
import { ProductsService } from '../../service/products-service/products.service';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;
  let debugElement: DebugElement;
  let cart:CartService;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    cart=debugElement.injector.get(CartService);
    fixture.detectChanges();
    spyOn(cart,'cartStatus').and.returnValue(new BehaviorSubject(new Cart(1,"",[new CartItem(1,5,'product',2)])));
    spyOn(window.console, 'log');
  });

  it('the component is created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('changeQuantity(id,quantity) should log an error when provided with a negative quantity', () => {
    fixture.detectChanges();
    component.changeQuantity(1,'-1');
    expect(window.console.log).toHaveBeenCalled();
  });

});
