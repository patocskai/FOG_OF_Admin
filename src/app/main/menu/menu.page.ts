import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { NewsDialogComponent } from 'src/app/shared/news-dialog/news-dialog.component';
import { FillService } from 'src/app/services/fill.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  userName = '';
  fills = [];
  numberOfNews = 0;
  pages = [
    {
      title: 'Munkacsoportok',
      url: '/menu/work-group',
      icon: 'people'
    },
    {
      title: 'Fal',
      url: '/menu/wall',
      icon: 'calendar-outline'

    },
    {
      title: 'Vizsgálatok',
      url: '/menu/examination',
      icon: 'document-text'
    },
    {
      title: 'Csoportstatisztika',
      url: '/menu/group-statistics',
      icon: 'bar-chart-outline'
    },
    {
      title: 'Tagok',
      url: '/menu/staff',
      icon: 'people-circle-outline'
    },
    {
      title: 'Diagnózis',
      url: '/menu/histological',
      icon: 'pulse-outline'
    },
  ];

  menu = [
    {
      title: 'Profil',
      url: '/menu/profile',
      icon: 'person'
    },
    {
      title: 'Kijelentkezés',
      url: '',
      icon: 'log-out-outline'
    }
  ];

  selectedPath = '';

  constructor(
    private router: Router,
    private fillService: FillService,
    private auth: AuthService,
    // tslint:disable-next-line: variable-name
    private _bottomSheet: MatBottomSheet
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  openNewsDialog(): void {
    this._bottomSheet.open(NewsDialogComponent, {
      data: this.fills,
      panelClass: 'news-dialog',
    });
  }

  ngOnInit() {
    this.numberOfNews = this.fills.length;
    this.userName = this.auth.lgUserName;
  }
}