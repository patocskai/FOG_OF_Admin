import { AuthGuard } from './../core/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainPage } from './main.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { WallPageModule } from './wall/wall.module';
import { ExaminationPageModule } from './examination/examination.module';
import { GroupStatisticsPageModule } from './group-statistics/group-statistics.module';
import { StaffPageModule } from './staff/staff.module';

const routes: Routes = [

  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'wall', loadChildren: './wall/wall.module#WallPageModule'
      },
      {
        path: 'examination', loadChildren: './examination/examination.module#ExaminationPageModule'
      },
      {
        // tslint:disable-next-line: max-line-length
        path: 'group-statistics', loadChildren: './group-statistics/group-statistics.module#GroupStatisticsPageModule'
      },
      {
        path: 'staff', loadChildren: './staff/staff.module#StaffPageModule'
      },
      {
        path: 'histological', loadChildren: './examination/examination.module#ExaminationPageModule'
      },
      {
        path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'
      },
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/main/wall', pathMatch: 'full' },

];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatFormFieldModule,
    WallPageModule,
    ExaminationPageModule,
    GroupStatisticsPageModule,
    StaffPageModule,
    RouterModule.forChild(routes)
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
