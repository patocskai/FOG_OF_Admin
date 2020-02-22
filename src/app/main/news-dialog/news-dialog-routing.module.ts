import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsDialogPage } from './news-dialog.page';

const routes: Routes = [
  {
    path: '',
    component: NewsDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsDialogPageRoutingModule {}
