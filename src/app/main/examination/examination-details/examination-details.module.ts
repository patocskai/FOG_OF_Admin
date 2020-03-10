import { WarningDialogPage } from './warning-dialog/warning-dialog.page';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExaminationDetailsPage } from './examination-details.page';
import { MatOptionModule, MatButtonModule, MatRadioModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule
  ],
  declarations: [
    ExaminationDetailsPage
  ],
  entryComponents: [
    WarningDialogPage
  ]
})
export class ExaminationDetailsPageModule { }