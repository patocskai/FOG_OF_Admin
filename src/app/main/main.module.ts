import { NewsDialogPage } from './../news-dialog/news-dialog.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainPage } from './main.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatFormFieldControl } from '@angular/material';
import { HeaderPageModule } from '../header/header.module';
import { SidenavMenuPageModule } from '../sidenav-menu/sidenav-menu.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { WallPageModule } from '../wall/wall.module';
import { ExaminationPageModule } from '../examination/examination.module';
import { GroupStatisticsPageModule } from '../group-statistics/group-statistics.module';
import { StaffPageModule } from '../staff/staff.module';

const routes: Routes = [
  { path: 'main', redirectTo: 'main/wall', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'wall', loadChildren: './../wall/wall.module#WallPageModule'
      },
      {
        path: 'examination', loadChildren: './../examination/examination.module#ExaminationPageModule'
      },
      {
        path: 'group-statistics', loadChildren: './../group-statistics/group-statistics.module#GroupStatisticsPageModule'
      },
      {
        path: 'staff', loadChildren: './../staff/staff.module#StaffPageModule'
      },
      {
        path: 'histological', loadChildren: './../examination/examination.module#ExaminationPageModule'
      },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    MatSidenavModule,
    HeaderPageModule,
    SidenavMenuPageModule,
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
