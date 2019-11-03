import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

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

import { HeaderComponent } from './Component/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

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
    MatSnackBarModule
  ],
  exports:[
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

    HeaderComponent
  ]

})
export class SharedModule { }
