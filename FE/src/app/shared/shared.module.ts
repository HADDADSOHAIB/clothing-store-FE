import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';

import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './Component/paginator/paginator.component';
import { HeaderComponent } from './Component/header/header.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './Component/footer/footer.component';
import { MatRadioModule } from '@angular/material/radio';
import { FilterAndSortComponent } from './Component/filter-and-sort/filter-and-sort.component';
import { OrderStatusComponent } from './Component/order-status/order-status.component';
import { OrderInfosComponent } from './Component/order-infos/order-infos.component';
import { RatingBarComponent } from './Component/rating-bar/rating-bar.component';
import { AuthInterceptor } from './interceptors/http.interceptor';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [
		PaginatorComponent,
		HeaderComponent,
		FooterComponent,
		FilterAndSortComponent,
		OrderStatusComponent,
		OrderInfosComponent,
		RatingBarComponent

	],
	imports: [
		SharedRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		CommonModule,

		FlexLayoutModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		MatGridListModule,
		MatFormFieldModule,
		MatBadgeModule,
		MatToolbarModule,
		MatDividerModule,
		MatExpansionModule,
		MatInputModule,
		MatTableModule,
		FlexLayoutModule,
		MatButtonModule,
		MatCardModule,
		MatStepperModule,
		MatSnackBarModule,
		MatChipsModule,
		MatSliderModule,
		MatSidenavModule,
		MatListModule,
		MatRadioModule,
		MatTooltipModule
	],
	exports: [
		PaginatorComponent,
		HeaderComponent,
		FooterComponent,
		FilterAndSortComponent,
		OrderStatusComponent,
		OrderInfosComponent,
		RatingBarComponent,


		SharedRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		CommonModule,

		FlexLayoutModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		MatGridListModule,
		MatFormFieldModule,
		MatBadgeModule,
		MatToolbarModule,
		MatDividerModule,
		MatExpansionModule,
		MatInputModule,
		MatTableModule,
		FlexLayoutModule,
		MatButtonModule,
		MatCardModule,
		MatStepperModule,
		MatSnackBarModule,
		MatChipsModule,
		MatSliderModule,
		MatSidenavModule,
		MatListModule,
		MatRadioModule,
		MatTooltipModule
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {

		return({
				ngModule: SharedModule,
				providers: [

				]
		});
	}

}
