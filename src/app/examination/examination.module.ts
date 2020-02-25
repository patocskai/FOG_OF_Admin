import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExaminationPage } from './examination.page';
import { MatButtonToggleModule, MatSlideToggleModule, MatOptionModule, MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  declarations: [ExaminationPage]
})
export class ExaminationPageModule {}
