import { LoginPage } from './login/login.page';
import { WallPage } from './wall/wall.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { MainPage } from './main/main.page';

const routes: Routes = [
  {
    path: 'wall', component: MainPage, children: [
      { path: '', component: WallPage, canActivate: [AuthGuard] },
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
