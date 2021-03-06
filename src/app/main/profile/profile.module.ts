import { MatCardModule } from '@angular/material/card';
import { ShareModule } from './../../shared/share.module';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { MatFormFieldModule, MatOptionModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
