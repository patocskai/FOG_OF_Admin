import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidenavMenuPageRoutingModule } from './sidenav-menu-routing.module';

import { SidenavMenuPage } from './sidenav-menu.page';
import { MatBadgeModule, MatBottomSheetModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidenavMenuPageRoutingModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatBottomSheetModule
  ],
  declarations: [SidenavMenuPage]
})
export class SidenavMenuPageModule { }
