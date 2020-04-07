import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RankingsPage } from './rankings.page';
import { MatFormFieldModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule
  ],
  declarations: [RankingsPage]
})
export class RankingsPageModule { }
