import { Component, OnInit, ViewChild } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { AuthService } from 'src/app/services/auth.service';
import { RankingsPage } from './rankings/rankings.page';
import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material';
import { PassDataService } from 'src/app/services/pass-data.service';

@Component({
  selector: 'app-group-statistics',
  templateUrl: './group-statistics.page.html',
  styleUrls: ['./group-statistics.page.scss'],
})

export class GroupStatisticsPage implements OnInit {
  loadSite = 'analyzes';
  periods = ['2018-Q1', '2018-Q2', '2018-Q3', 'Összes'];
  selectedVal = 'analyzes';

  @ViewChild(RankingsPage, { static: false}) child: RankingsPage;
  selected = new FormControl(0);

  @ViewChild('tabGroup', { static: false}) tabGroup: MatTabGroup;


  constructor(private examinationService: ExaminationService, private auth: AuthService, private dataService: PassDataService) { }
  loadChild(siteName) {
    this.loadSite = siteName;
  }

  updateVariable(value: string) {
  }

  tabChanged(event) {
    this.dataService.selectedTab = event.tab.textLabel;
   // this.child.setDataSource();
  }

  async ngOnInit() {
  }

}
