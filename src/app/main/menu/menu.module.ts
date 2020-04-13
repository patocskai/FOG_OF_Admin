import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { ExaminationPage } from '../examination/examination.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'wall',
        loadChildren: 'src/app/main/wall/wall.module#WallPageModule',
      },
      {
        path: 'examination',
        loadChildren:
          'src/app/main/examination/examination.module#ExaminationPageModule',
      },
      {
        path: 'group-statistics',
        loadChildren:
          'src/app/main/group-statistics/group-statistics.module#GroupStatisticsPageModule',
      },
      {
        path: 'staff',
        loadChildren: 'src/app/main/staff/staff.module#StaffPageModule',
      },
      {
        path: 'profile',
        loadChildren: 'src/app/main/profile/profile.module#ProfilePageModule',
      },
      {
        path: 'histological',
        loadChildren:
          'src/app/main/examination/examination.module#ExaminationPageModule',
      },
      {
        path: '',
        redirectTo: '/menu/wall',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    MenuPage
  ],
})
export class MenuPageModule {}
