import { AuthGuard } from './core/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'menu', loadChildren: 'src/app/main/menu/menu.module#MenuPageModule', canActivate:[AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
