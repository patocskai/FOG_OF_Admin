import { AuthGuard } from './../core/auth.guard';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'main', redirectTo: 'main/wall', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'wall', loadChildren: './wall/wall.module#WallPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'examination', loadChildren: './examination/examination.module#ExaminationPageModule', canActivate: [AuthGuard]
      },
      {
        // tslint:disable-next-line: max-line-length
        path: 'group-statistics', loadChildren: './group-statistics/group-statistics.module#GroupStatisticsPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'staff', loadChildren: './staff/staff.module#StaffPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'histological', loadChildren: './examination/examination.module#ExaminationPageModule', canActivate: [AuthGuard]
      },
      {
        path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuard]
      },
    ]
  }

];

// {
//   path: 'home', component: MainPage, children: [
//     { path: 'wall', component: WallPage, canActivate: [AuthGuard] },
//     { path: 'examination', component: ExaminationPage, canActivate: [AuthGuard] },
//     { path: 'group-statistics', component: GroupStatisticsPage, canActivate: [AuthGuard] },
//     { path: 'staff', component: StaffPage, canActivate: [AuthGuard] },
//     { path: 'histological', component: ExaminationPage, canActivate: [AuthGuard] },
//     { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
//   ]
// },

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
