import { HeaderPage } from './header/header.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainPage } from './main.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { HeaderPageModule } from './header/header.module';
import { SidenavMenuPageModule } from './sidenav-menu/sidenav-menu.module';
import { WallPageModule } from './wall/wall.module';
import { ExaminationPageModule } from './examination/examination.module';
import { GroupStatisticsPageModule } from './group-statistics/group-statistics.module';
import { StaffPageModule } from './staff/staff.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSidenavModule,
    SidenavMenuPageModule,
    HeaderPageModule,
    MatInputModule,
    MatFormFieldModule,
    WallPageModule,
    ExaminationPageModule,
    GroupStatisticsPageModule,
    StaffPageModule
  ],
  declarations: [
    MainPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    MainPage
  ]
})
export class MainPageModule { }
