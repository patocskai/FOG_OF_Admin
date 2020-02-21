import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallPage } from './wall.page';

const routes: Routes = [
  {
    path: '',
    component: WallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WallPageRoutingModule {}
