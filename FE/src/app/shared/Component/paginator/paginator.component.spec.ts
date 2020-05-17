import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreFrontComponent } from 'src/app/store/component/store-front/store-front.component';
import { ProductCardComponent } from 'src/app/store/component/product-card/product-card.component';
import { StoreHeaderComponent } from 'src/app/store/component/store-navbar/store-navbar.component';
import { StoreComponent } from 'src/app/store/store.component';
import { ProductFormComponent } from 'src/app/store/component/product-form/product-form.component';
import { CheckOutComponent } from 'src/app/store/component/check-out/check-out.component';
import { ShippingFormComponent } from 'src/app/store/component/shipping-form/shipping-form.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
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
        CommonModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.availableProductCount = 80;
    component.currentPage = 3;

    spyOn(component, 'emitPageNumber').and.callThrough();

    compiled = fixture.debugElement.nativeElement;
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
    const page = component.currentPage;
    component.beforePage();
    expect(component.currentPage).toEqual(page - 1);
  });

  it('beforePage() should call emitPageNumber()', () => {
    component.beforePage();
    expect(component.emitPageNumber).toHaveBeenCalled();
  });

  it('nextPage() should set the current page to the next page ', () => {
    const page = component.currentPage;
    component.nextPage();
    expect(component.currentPage).toEqual(page + 1);
  });

  it('nextPage() should call emitPageNumber()', () => {
    component.nextPage();
    expect(component.emitPageNumber).toHaveBeenCalled();
  });

  it('lastPage() should set the current page to the last page ', () => {
    const lastPage = component.availablePagesList[component.availablePagesList.length - 1];
    component.lastPage();
    expect(component.currentPage).toEqual(parseInt(lastPage));
  });

  it('lastPage() should call emitPageNumber()', () => {
    component.lastPage();
    expect(component.emitPageNumber).toHaveBeenCalled();
  });

  it('emitPageNumber() should emit using pageNumberEmitter the current page whent called', () => {
    spyOn(component.pageNumberEmitter, 'emit');
    component.currentPage = 5;
    component.emitPageNumber();
    expect(component.pageNumberEmitter.emit).toHaveBeenCalledWith(5);
  });

  it('emitItemsPerPage() should emit using ItemsPerPageEmitter the itemsPerPage whent called', () => {
    spyOn(component.itemsPerPageEmitter, 'emit');
    component.emitItemsPerPage();
    expect(component.itemsPerPageEmitter.emit).toHaveBeenCalledWith(parseInt(component.itemsPerPage));
  });

  it('should render a list with all pages options', () => {
    const options = compiled.querySelectorAll('.page-options');
    expect(options.length).toEqual(component.availablePagesList.length);
  });
});
