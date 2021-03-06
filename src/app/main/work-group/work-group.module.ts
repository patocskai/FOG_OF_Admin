import { GroupModalPage } from './group-modal/group-modal.page';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { WorkGroupPage } from './work-group.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WorkGroupPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [WorkGroupPage, GroupModalPage],
  entryComponents: [GroupModalPage],
  providers: [
    DatePipe
  ]
})
export class WorkGroupPageModule {}
