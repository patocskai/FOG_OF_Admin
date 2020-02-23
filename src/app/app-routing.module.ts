import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  { path: '', loadChildren: './main/main.module#MainPageModule' },
  {
    path: '**',
    redirectTo: '',
  },
  { path: 'login', component: LoginPage, data: { title: 'Bejelentkezés - FOG_OF-Admin' } },
  { path: 'login/:routeTo', component: LoginPage, data: { title: 'Bejelentkezés - FOG_OF-Admin' } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
