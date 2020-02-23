import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SidenavMenuPage } from './sidenav-menu.page';
import { MatBadgeModule, MatBottomSheetModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatBottomSheetModule,
    RouterModule
  ],
  declarations: [SidenavMenuPage]
})
export class SidenavMenuPageModule { }
