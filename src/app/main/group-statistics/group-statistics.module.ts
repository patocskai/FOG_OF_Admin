import { ShareModule } from './../../shared/share.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RankingsPage } from './rankings/rankings.page';
import { AnalyzesPage } from './analyzes/analyzes.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupStatisticsPage } from './group-statistics.page';
import { MatInputModule, MatFormFieldModule, MatTableModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: GroupStatisticsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    RouterModule.forChild(routes),
    ShareModule,
    ChartsModule
  ],
  declarations: [
    GroupStatisticsPage,
    AnalyzesPage,
    RankingsPage
  ]
})
export class GroupStatisticsPageModule {}
