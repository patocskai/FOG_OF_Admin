import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  { path: '', redirectTo: 'main/wall', pathMatch: 'full' },
  { path: 'main', redirectTo: 'main/wall', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'wall', loadChildren: './wall/wall.module#WallPageModule'
      },
    ],
    canActivateChild: []
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
