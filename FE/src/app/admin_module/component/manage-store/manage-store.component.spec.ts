import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStoreComponent } from './manage-store.component';

describe('ManageStoreComponent', () => {
	let component: ManageStoreComponent;
	let fixture: ComponentFixture<ManageStoreComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ManageStoreComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ManageStoreComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
