import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './Component/paginator/paginator.component';
import { HeaderComponent } from './Component/header/header.component';
import { ProductsService } from './services/products-service/products.service';
import { AuthInterceptor } from './interceptors/http.interceptor';
import { OrderService } from './services/order-service/order.service';
import { TitleDescriptionPipe } from './pipes/title-description.pipe';

@NgModule({
  declarations:[
    PaginatorComponent,
    HeaderComponent,
    TitleDescriptionPipe
  ],
  imports: [
    SharedRoutingModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatSnackBarModule,
    MatChipsModule

  ],
  exports:[
    PaginatorComponent,
    HeaderComponent,
    TitleDescriptionPipe,
    
    SharedRoutingModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatSnackBarModule,
    MatChipsModule
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ 
        ProductsService,
        {
          provide:HTTP_INTERCEPTORS,
          useClass:AuthInterceptor,
          multi:true
        },
        OrderService
      ]
    };
  }
}
