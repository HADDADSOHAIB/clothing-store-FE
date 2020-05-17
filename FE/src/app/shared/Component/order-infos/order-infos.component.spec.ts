import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfosComponent } from './order-infos.component';

describe('OrderFormComponent', () => {
	let component: OrderInfosComponent;
	let fixture: ComponentFixture<OrderInfosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ OrderInfosComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderInfosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
