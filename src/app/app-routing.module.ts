import { StaffPage } from './main/staff/staff.page';
import { ProfilePage } from './main/profile/profile.page';
import { LoginPage } from './login/login.page';
import { WallPage } from './main/wall/wall.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { MainPage } from './main/main.page';
import { ExaminationPage } from './main/examination/examination.page';
import { GroupStatisticsPage } from './main/group-statistics/group-statistics.page';

const routes: Routes = [
  {
    path: 'wall', component: MainPage, children: [
      { path: '', component: WallPage, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'examination', component: MainPage, children: [
      { path: '', component: ExaminationPage, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'group-statistics', component: MainPage, children: [
      { path: '', component: GroupStatisticsPage, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'staff', component: MainPage, children: [
      { path: '', component: StaffPage, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'histological', component: MainPage, children: [
      { path: '', component: ExaminationPage, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'profile', component: MainPage, children: [
      { path: '', component: ProfilePage, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
