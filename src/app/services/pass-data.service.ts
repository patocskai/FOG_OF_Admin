import { Injectable } from '@angular/core';
import { Examination } from '../interfaces/examination.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  navLinks = [];
  selectedStaffDetails = {};
  selectedStaff = '';
  selectedVisit = '';
  loaded = Promise.resolve(false);
  selectedTab = 'Országos rangsor';
  selectedMainTab = '';
  selectedExamination: Examination;
  personDetails = false;
  headerUser = '';
  examnitationDetails = false;
  numberOfNews = 0;
  constructor(private auth: AuthService) {
    this.navLinks = [
      {
        label: 'Fal',
        link: '/wall',
        matIcon: 'comment',
        index: 0,
        active: false
      }, {
        label: 'Vizsgálatok',
        link: '/examination',
        matIcon: 'library_books',
        index: 1,
        active: false
      }, {
        label: 'Csoportstatisztikák',
        link: '/group-statistics',
        matIcon: 'pie_chart',
        index: 2,
        active: false
      }, {
        label: 'Munkatársak',
        link: '/staff',
        matIcon: 'group',
        index: 3,
        active: false
      }, {
        label: 'Diagnózis',
        link: '/histological',
        matIcon: 'assignment',
        index: 4,
        active: false
      }
    ];
  }

  checkRole() {
    if (!this.auth.canAddHistoDiagnosis()) {
      this.navLinks.splice(4, 1);
    }
  }
}
