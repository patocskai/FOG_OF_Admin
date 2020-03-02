import { ProfilePage } from './profile/profile.page';
import { LoginPage } from './login/login.page';
import { WallPage } from './wall/wall.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { MainPage } from './main/main.page';
import { ExaminationPage } from './examination/examination.page';
import { GroupStatisticsPage } from './group-statistics/group-statistics.page';

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
    path: 'profile', component: MainPage, children: [
      { path: '', component: ProfilePage, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'examination-details',
    loadChildren: () => import('./examination/examination-details/examination-details.module').then( m => m.ExaminationDetailsPageModule)
  },
  {
    path: 'fill-details',
    loadChildren: () => import('./examination/examination-details/fill-details/fill-details.module').then( m => m.FillDetailsPageModule)
  },
  {
    path: 'warning-dialog',
    loadChildren: () => import('./examination/examination-details/warning-dialog/warning-dialog.module').then( m => m.WarningDialogPageModule)
  },
  {
    path: 'group-statistics',
    loadChildren: () => import('./group-statistics/group-statistics.module').then( m => m.GroupStatisticsPageModule)
  },  {
    path: 'analyzes',
    loadChildren: () => import('./group-statistics/analyzes/analyzes.module').then( m => m.AnalyzesPageModule)
  },
  {
    path: 'rankings',
    loadChildren: () => import('./group-statistics/rankings/rankings.module').then( m => m.RankingsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
