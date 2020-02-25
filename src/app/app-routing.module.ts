import { ProfilePage } from './profile/profile.page';
import { LoginPage } from './login/login.page';
import { WallPage } from './wall/wall.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { MainPage } from './main/main.page';
import { ExaminationPage } from './examination/examination.page';

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


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
