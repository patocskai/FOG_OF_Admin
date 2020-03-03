import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderPage } from './header.page';
import { MatToolbarModule, MatBottomSheetModule, MatDialogModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {RouterTestingModule} from '@angular/router/testing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatBadgeModule,
    MatBottomSheetModule,
    RouterTestingModule,
    MatDialogModule
  ],
  declarations: [HeaderPage]
})
export class HeaderPageModule {}
