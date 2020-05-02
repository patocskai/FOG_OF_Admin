import { MenuPage } from './../main/menu/menu.page';
import { Injectable, ViewChild } from '@angular/core';
import { Examination } from '../interfaces/examination.interface';
import { AuthService } from './auth.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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

  workGroup = [];
  workGroupId = '';
  isCheck = true;



  constructor(private auth: AuthService) {
    this.navLinks = [
      {
        label: 'Fal',
        link: '/wall',
        matIcon: 'comment',
        index: 0,
        active: false,
      },
      {
        label: 'Vizsgálatok',
        link: '/examination',
        matIcon: 'library_books',
        index: 1,
        active: false,
      },
      {
        label: 'Csoportstatisztikák',
        link: '/group-statistics',
        matIcon: 'pie_chart',
        index: 2,
        active: false,
      },
      {
        label: 'Munkatársak',
        link: '/staff',
        matIcon: 'group',
        index: 3,
        active: false,
      },
      {
        label: 'Diagnózis',
        link: '/histological',
        matIcon: 'assignment',
        index: 4,
        active: false,
      },
    ];
  }

  private subject = new Subject<any>();

  sendMessage(message: string) {
      this.subject.next({ text: message });
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

  setId(id) {
    this.workGroupId = id;
  }
  setCheckFalse(isCheck) {
    this.isCheck = isCheck;
  }

  getCheckFalse(){
    return this.isCheck;
  }
  getId() {
    console.log(this.workGroupId);
    return this.workGroupId;
  }
  setWorkGroup(id, workGroup) {
    this.workGroup[id] = workGroup;
  }

  getWorkGroup(id) {
    return this.workGroup[id];
  }

  checkRole() {
    if (!this.auth.canAddHistoDiagnosis()) {
      this.navLinks.splice(4, 1);
    }
  }
}
