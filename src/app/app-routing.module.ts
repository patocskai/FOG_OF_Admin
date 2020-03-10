import { ProfilePageModule } from './main/profile/profile.module';
import { StaffPageModule } from './main/staff/staff.module';
import { GroupStatisticsPageModule } from './main/group-statistics/group-statistics.module';
import { ExaminationPageModule } from './main/examination/examination.module';
import { ShareModule } from './shared/share.module';
import { WallPageModule } from './main/wall/wall.module';
import { AuthGuard } from './core/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'wall', loadChildren: './wall/wall.module#WallPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'examination', loadChildren: './examination/examination.module#ExaminationPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'group-statistics', loadChildren: './group-statistics/group-statistics.module#GroupStatisticsPageModule',
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
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    WallPageModule,
    ExaminationPageModule,
    GroupStatisticsPageModule,
    StaffPageModule,
    ProfilePageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
