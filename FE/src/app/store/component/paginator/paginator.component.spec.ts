import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { StoreFrontComponent } from '../store-front/store-front.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { StoreHeaderComponent } from '../store-header/store-header.component';
import { StoreComponent } from '../../store.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from '../../store-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsService } from '../../service/products-service/products.service';
import { HttpClient } from 'selenium-webdriver/http';
import { CartService } from '../../service/cart-service/cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let compiled:any;
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
        CommonModule,
        StoreRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.availableProductCount=80;
    component.currentPage=3;

    spyOn(component,'emitPageNumber');

    compiled=fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('the component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('firstPage() should set the current page to 1st ', () => {
    expect(component.currentPage).toEqual(3);
    component.firstPage();
    expect(component.currentPage).toEqual(1);
  });

  it('firstPage() should call emitPageNumber()', () => {
    component.firstPage();
    expect(component.emitPageNumber).toHaveBeenCalled();
  });

  it('beforePage() should set the current page to previous page ', () => {
    let page=component.currentPage;
    component.beforePage();
    expect(component.currentPage).toEqual(page-1);
  });

  it('beforePage() should call emitPageNumber()', () => {
    component.beforePage();
    expect(component.emitPageNumber).toHaveBeenCalled();
  });

  it('nextPage() should set the current page to the next page ', () => {
    let page=component.currentPage;
    component.nextPage();
    expect(component.currentPage).toEqual(page+1);
  });

  it('nextPage() should call emitPageNumber()', () => {
    component.nextPage();
    expect(component.emitPageNumber).toHaveBeenCalled();
  });

  it('lastPage() should set the current page to the last page ', () => {
    let lastPage=component.availablePagesList[component.availablePagesList.length-1];
    component.lastPage();
    expect(component.currentPage).toEqual(parseInt(lastPage));
  });

  it('lastPage() should call emitPageNumber()', () => {
    component.lastPage();
    expect(component.emitPageNumber).toHaveBeenCalled();
  });

  it('emitPageNumber() should emit using pageNumberEmitter the current page whent called', () => {
    spyOn(component.pageNumberEmitter,'emit');
    component.emitPageNumber();
    expect(component.pageNumberEmitter.emit).toHaveBeenCalledWith(component.currentPage);
  });

  it('emitItemsPerPage() should emit using ItemsPerPageEmitter the itemsPerPage whent called', () => {
    spyOn(component.itemsPerPageEmitter,'emit');
    component.emitItemsPerPage();
    expect(component.itemsPerPageEmitter.emit).toHaveBeenCalledWith(component.itemsPerPage);
  });

  it('should render a list with all pages options', () => {
    let options=compiled.querySelectorAll("mat-option");
    expect(options.length).toEqual(component.availablePagesList.length);
  });
});