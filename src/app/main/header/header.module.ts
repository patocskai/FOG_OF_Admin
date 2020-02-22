import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderPageRoutingModule } from './header-routing.module';

import { HeaderPage } from './header.page';
import { MatToolbarModule, MatBottomSheetModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderPageRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatBadgeModule,
    MatBottomSheetModule
  ],
  declarations: [HeaderPage]
})
export class HeaderPageModule {}
