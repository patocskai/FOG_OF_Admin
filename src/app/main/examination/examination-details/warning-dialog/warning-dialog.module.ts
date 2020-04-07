import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WarningDialogPage } from './warning-dialog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDialogModule
  ],
  declarations: [WarningDialogPage]
})
export class WarningDialogPageModule {}
