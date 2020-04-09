import { ExaminationPage } from './main/examination/examination.page';
import { ProfilePageModule } from './main/profile/profile.module';
import { StaffPageModule } from './main/staff/staff.module';
import { GroupStatisticsPageModule } from './main/group-statistics/group-statistics.module';
import { ExaminationPageModule } from './main/examination/examination.module';
import { AuthGuard } from './core/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallPageModule } from './main/wall/wall.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'wall',
    loadChildren: './main/wall/wall.module#WallPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'examination',
    loadChildren: './main/examination/examination.module#ExaminationPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'group-statistics',
    loadChildren:
      './main/group-statistics/group-statistics.module#GroupStatisticsPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'staff',
    loadChildren: './main/staff/staff.module#StaffPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: './main/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'histological',
    component: ExaminationPage,
    canActivate: [AuthGuard],
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    WallPageModule,
    ExaminationPageModule,
    GroupStatisticsPageModule,
    StaffPageModule,
    ProfilePageModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
