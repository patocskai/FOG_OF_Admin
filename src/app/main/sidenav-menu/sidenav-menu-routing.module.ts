import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavMenuPage } from './sidenav-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SidenavMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavMenuPageRoutingModule {}
