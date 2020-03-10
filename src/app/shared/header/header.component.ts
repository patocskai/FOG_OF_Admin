import { Component, OnInit, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav, MatBottomSheet } from '@angular/material';
import { PassDataService } from 'src/app/services/pass-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { FillService } from 'src/app/services/fill.service';
import { Fill } from 'src/app/interfaces/fill.interface';
import { NewsDialogComponent } from '../news-dialog/news-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selectedVal = '';
  activeLinkIndex = -1;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  loggedUser: Practitioner;
  lgUserName = '';
  reason = '';
  screenHeight;
  screenWidth;
  lastSignIn;
  fills = [];
  loaded;
  @Output() public sidenavToggle = new EventEmitter();
  sidenave = false;
  numberOfNews = 0;
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  constructor(
    public dataService: PassDataService,
    private router: Router,
    public auth: AuthService,
    private fillService: FillService,
    // tslint:disable-next-line: variable-name
    private _bottomSheet: MatBottomSheet) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1150) {
      this.sidenave = true;
    } else {
      this.sidenave = false;
    }
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  openNewsDialog(): void {
    this._bottomSheet.open(NewsDialogComponent, {
      data: this.fills,
      panelClass: 'news-dialog'
    });
  }

  async getUserFills() {
    const promise = new Promise((resolve, reject) => {
      let fills = [];
      // tslint:disable-next-line: only-arrow-functions
      this.fillService.getUserFills().then(function (querySnapshot) {
        fills = [];
        let i = 0;
        // tslint:disable-next-line: only-arrow-functions
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          if (data.opened !== 'yes' && data.opened !== 'none') {
            fills.push(data);
            fills[i].fillID = doc.id;
            fills[i].type = 'new';
            i++;
          }
          // tslint:disable-next-line: triple-equals
          if (data.opened == 'none' && data.diagnose != 'none') {
            fills.push(data);
            fills[i].fillID = doc.id;
            fills[i].type = 'closed';
            i++;
          }
        });
        resolve(fills);
      });
    });
    this.fills = await promise as Fill[];
  }

  setExamination(tab: any) {
    this.dataService.selectedVisit = '';
    this.dataService.selectedMainTab = tab.label;
  }

  navigate() {
    this.router.navigateByUrl('/settings');
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    await this.auth.getUser();
    this.dataService.checkRole();
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.dataService.navLinks.indexOf(this.dataService.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    await this.getUserFills();
    this.onResize();
    this.numberOfNews = this.fills.length;
  }

}
