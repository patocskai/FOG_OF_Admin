import { NewsDialogPage } from '../../main/news-dialog/news-dialog.page';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WDialogPage } from './w-dialog/w-dialog.page';
import { ResultPage } from './result/result.page';
import { AddDialogPage } from './add-dialog/add-dialog.page';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StaffPage } from './staff.page';
import { MatInputModule, MatAutocompleteModule, MatCheckboxModule, MatOptionModule, MatSnackBarModule, MatButtonModule } from '@angular/material';
import { DataPage } from './data/data.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'staff',
    component: StaffPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    DragDropModule,
    MatListModule,
    MatOptionModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  declarations: [
    StaffPage,
    AddDialogPage,
    DataPage,
    ResultPage,
    WDialogPage,
    NewsDialogPage
  ],
  entryComponents: [
    DataPage,
    AddDialogPage,
    WDialogPage,
    NewsDialogPage
  ]
})
export class StaffPageModule { }
