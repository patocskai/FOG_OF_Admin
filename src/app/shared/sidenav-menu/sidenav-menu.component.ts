import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PassDataService } from 'src/app/services/pass-data.service';
import { FillService } from 'src/app/services/fill.service';
import { Fill } from 'src/app/interfaces/fill.interface';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { NewsDialogComponent } from '../news-dialog/news-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {
  navLinks = [];
  fills = [];
  @Output() sidenavClose = new EventEmitter();
  numberOfNews = 0;

  constructor(private auth: AuthService, public dataService: PassDataService,
    private fillService: FillService, private dialog: MatDialog, private router: Router, private _bottomSheet: MatBottomSheet) {
    this.navLinks = [
      {
        label: 'Fal',
        link: '/wall',
        matIcon: 'comment',
        index: 0
      }, {
        label: 'Vizsgálatok',
        link: '/examination',
        matIcon: 'library_books',
        index: 1
      }, {
        label: 'Csoportstatisztikák',
        link: '/group-statistics',
        matIcon: 'pie_chart',
        index: 2
      }, {
        label: 'Munkatársak',
        link: '/staff',
        matIcon: 'group',
        index: 3
      }, {
        label: 'Szövettani diagnózis',
        link: '/histological',
        matIcon: 'assignment',
        index: 4
      }
    ];
  }

  async getUserFills() {
    let promise = new Promise((resolve, reject) => {
      let fills = [];
      this.fillService.getUserFills().then(function (querySnapshot) {
        fills = [];
        let i = 0;
        querySnapshot.forEach(function (doc) {
          if (doc.data().opened !== 'yes') {
            fills.push(doc.data());
            fills[i].fillID = doc.id
            i++
          }
        });
        resolve(fills)
      });
    });
    this.fills = await promise as Fill[];
  }

  async setExamination(tab: string) {
    this.dataService.selectedVisit = '';
    this.dataService.selectedMainTab = tab;
  }

  logout() {
    this.auth.logout();
    this.sidenavClose.emit();
  }

  openProfile() {
    this.router.navigateByUrl('/profile');
    this.sidenavClose.emit();
  }

  openNewsDialog() {
    this._bottomSheet.open(NewsDialogComponent, {
      data: this.fills,
      panelClass: 'news-dialog'
    });
    this.onSidenavClose();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  async ngOnInit() {
    await this.auth.getUser();
    await this.getUserFills();
    this.numberOfNews = this.fills.length;
  }

}
