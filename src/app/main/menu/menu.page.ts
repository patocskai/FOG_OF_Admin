import { PassDataService } from 'src/app/services/pass-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { NewsDialogComponent } from 'src/app/shared/news-dialog/news-dialog.component';
import { FillService } from 'src/app/services/fill.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  userName = '';
  fills = [];
  numberOfNews = 0;
  workGroup = [];
  displayWorkGroup = false;
  workGroupId;
  workGroupName;
  actualWorkGroup: any[] = [];
  subscription: Subscription;

  pages = [
    {
      title: 'Fal',
      url: '/menu/wall',
      icon: 'calendar-outline',
    },
    {
      title: 'Vizsgálatok',
      url: '/menu/examination',
      icon: 'document-text',
    },
    {
      title: 'Csoportstatisztika',
      url: '/menu/group-statistics',
      icon: 'bar-chart-outline',
    },
    {
      title: 'Tagok',
      url: '/menu/staff',
      icon: 'people-circle-outline',
    },
    {
      title: 'Diagnózis',
      url: '/menu/histological',
      icon: 'pulse-outline',
    },
  ];

  menu = [
    {
      title: 'Profil',
      url: '/menu/profile',
      icon: 'person',
    },
    {
      title: 'Kijelentkezés',
      url: '',
      icon: 'log-out-outline',
    },
  ];

  selectedPath = '';
  selected = '/menu/work-group';
  selectedID = '';

  constructor(
    private router: Router,
    private fillService: FillService,
    private auth: AuthService,
    // tslint:disable-next-line: variable-name
    private _bottomSheet: MatBottomSheet,
    private dataService: PassDataService,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });

    this.subscription = this.dataService.getMessage().subscribe((message) => {
      if (message) {
        this.actualWorkGroup.push(message);
        this.displayWorkGroup = true;
      }
      this.workGroupId = this.actualWorkGroup[0];
      this.workGroupName = this.actualWorkGroup[1];
      console.log(this.workGroupId);
      console.log(this.workGroupName);
    });
  }

  ngOnInit() {
    this.numberOfNews = this.fills.length;
    this.userName = this.auth.lgUserName;
  }

  routeActualWorkGroup() {
    this.router.navigate(['/menu/work-group', this.workGroupId.message]);
  }

  setMenu() {
    // this.displayWorkGroup = false;
    // this.dataService.setCheckFalse(false);
  }

  openNewsDialog(): void {
    this._bottomSheet.open(NewsDialogComponent, {
      data: this.fills,
      panelClass: 'news-dialog',
    });
  }
}
