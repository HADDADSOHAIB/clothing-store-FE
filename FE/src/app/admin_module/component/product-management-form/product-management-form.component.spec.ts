import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementFormComponent } from './product-management-form.component';

describe('ProductManagementFormComponent', () => {
	let component: ProductManagementFormComponent;
	let fixture: ComponentFixture<ProductManagementFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductManagementFormComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductManagementFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
