import { ShareModule } from './../../shared/share.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExaminationDetailsPage } from './examination-details/examination-details.page';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExaminationPage } from './examination.page';
import { MatButtonToggleModule, MatSlideToggleModule, MatExpansionModule, MatRadioModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'examination',
    component: ExaminationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [
    ExaminationPage,
    ExaminationDetailsPage
  ]
})
export class ExaminationPageModule { }
