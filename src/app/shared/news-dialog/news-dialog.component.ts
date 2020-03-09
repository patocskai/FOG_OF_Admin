import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { PassDataService } from 'src/app/services/pass-data.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FillService } from 'src/app/services/fill.service';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.css']
})
export class NewsDialogComponent implements OnInit {

  practitioners = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<NewsDialogComponent>,
    private dataService: PassDataService,
    private _router: Router,
    private fillservice: FillService
  ) { }

  ngOnInit() {
    this.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  openExam(news: any) {
    if (news.type == 'closed') {
      this.fillservice.updateFillOpened(news.fillID, 'yes');
    }
    this.dataService.selectedVisit = news.examinationID;
    this._router.navigate(['examination']);
    this._bottomSheetRef.dismiss();
  }
}
