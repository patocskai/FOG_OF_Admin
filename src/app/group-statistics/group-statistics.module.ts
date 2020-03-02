import { MatTabsModule } from '@angular/material/tabs';
import { RankingsPageModule } from './rankings/rankings.module';
import { AnalyzesPageModule } from './analyzes/analyzes.module';
import { RankingsPage } from './rankings/rankings.page';
import { AnalyzesPage } from './analyzes/analyzes.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupStatisticsPage } from './group-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule
  ],
  declarations: [
    GroupStatisticsPage,
    AnalyzesPage,
    RankingsPage
  ]
})
export class GroupStatisticsPageModule {}
