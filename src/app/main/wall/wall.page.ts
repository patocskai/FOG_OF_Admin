import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PassDataService } from 'src/app/services/pass-data.service';
import { Router } from '@angular/router';
import { ExaminationService } from 'src/app/services/examination.service';
import { Examination } from 'src/app/interfaces/examination.interface';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { DatePipe } from '@angular/common';
import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';
import { AuthService } from 'src/app/services/auth.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatFormFieldControl } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { Noti } from 'src/app/interfaces/noti.interface';

export interface CalendarEvents {
  title: string;
  date: Date;
}

@Component({
  selector: 'app-wall',
  templateUrl: './wall.page.html',
  styleUrls: ['./wall.page.scss']
})
export class WallPage implements OnInit {

  textAreaOpen = false;
  isHidden = false;
  todayEvents: Examination[] = [];
  examinations: Examination[] = [];
  practitioners = [];
  tpractitioners: Practitioner[] = [];
  workgroups: Workgroup[] = [];
  calendarEvents: CalendarEvents[] = [];
  calendarPlugins = [dayGridPlugin]; // important!
  load = true;
  workGroupsName = [];
  notifications = [];
  events = [];
  calendarCols = 0;
  textAreaCols = 0;
  newsCols = 0;
  breakpoint = 0;
  calendarRowspan = 0;
  rowspan = 0;
  windowWidth = 0;

  protected staff: Practitioner[] = [];
  public practitionersMultiCtrl: FormControl = new FormControl();
  public contentCtrl: FormControl = new FormControl();
  public practitionersMultiFilterCtrl: FormControl = new FormControl();
  public filteredPractitionersMulti: ReplaySubject<Practitioner[]> = new ReplaySubject<Practitioner[]>(1);
  @ViewChild('multiSelect', {static: false}) multiSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  @Input() placeholderLabel = 'Keresés';


  constructor(
    private dataService: PassDataService,
    private _router: Router,
    private examinationService: ExaminationService,
    private practitionerService: PractitionerService,
    private workgroupService: WorkgroupService,
    private notiService: NotificationService,
    public datepipe: DatePipe,
    private auth: AuthService
  ) { }

  onResize() {
    this.windowWidth = window.innerWidth;
  }

  mouseOver(event) {
  }

  handleDateClick(event) {
    this.dataService.selectedVisit = event.el.innerText;
    this._router.navigateByUrl('/examination');
  }

  createNotification() {
    this.textAreaOpen = false;
    let practID = [];
    let i = 0;
    let shareWith = this.practitionersMultiCtrl.value;
    let content = this.contentCtrl.value;
    this.practitionersMultiCtrl.reset();
    this.contentCtrl.reset();
    const today = new Date();
    const converted = this.datepipe.transform(today, 'yyyy-MM-dd');
    const id = converted + '-' + this.auth.loggedUser.practitonerID;
    if (shareWith.length > 0) {
      shareWith.forEach(element => {
        practID[i] = element.practitonerID;
        i++;
      });
    }
    let notification: Noti = {
      author: this.auth.loggedUser.practitonerID,
      content: content,
      creationDate: converted,
      shareWith: practID,
      workgroupID: this.auth.loggedUser.workgroup
    };
    this.notiService.addNotification(notification, id);
  }

  async getExaminations() {
    let promise = new Promise((resolve, reject) => {
      let examinations = [];
      this.examinationService.getExaminations().onSnapshot(function (querySnapshot) {
        examinations = [];
        let i = 0;
        querySnapshot.forEach(function (doc) {
          examinations.push(doc.data());
          examinations[i].examinationID = doc.id;
          i++;
        });
        resolve(examinations);
      });
    });
    this.examinations = await promise as Examination[];
  }

  async getExaminationsData() {
    this.todayEvents = [];
    this.calendarEvents = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.examinations.length; i++) {
      const date = this.examinations[i].expirationDate;
      const today = new Date();
      const converted = this.datepipe.transform(today, 'yyyy-MM-dd');
      if (new Date(date).getTime() === new Date(converted).getTime()) {
        this.todayEvents.push(this.examinations[i]);
        this.practitionerService.getPractitioners(this.examinations[i].practitionerID).subscribe(dataa => {
          this.tpractitioners.push(dataa as Practitioner);
        });
      }
    }
    this.examinations.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    let i = 0;
    this.examinations.forEach(element => {
      let asd = {
        title: this.examinations[i].examinationID,
        date: this.examinations[i].expirationDate
      };
      this.calendarEvents.push(asd);
      i++;
    });
  }

  async getWorkgroups() {
    this.workgroups = this.workgroupService.workgroups;
    this.workgroups.forEach(element => {
      this.workGroupsName.push(element.name);
    });
  }

  async getPractitioner(id: string) {
    let practitioner: Practitioner;
    let practitionerName = '';
    await this.practitionerService.getPractitioners(id).subscribe(data => {
      practitioner = data as Practitioner;
      practitionerName = practitioner.prefix + ' ' + practitioner.family + ' ' + practitioner.given + ' ' + practitioner.suffix;
      this.practitioners.push(practitionerName);
    });
  }

  getNames(index: number) {
    let practitioner: Practitioner;
    let practitionerName = '';
    let shareWithNames = [];
    let shareWithIDs = this.notiService.notifications[index];
    shareWithIDs.shareWith.forEach(element => {
      this.practitionerService.getPractitioners(element).subscribe(data => {
        practitioner = data as Practitioner;
        practitionerName = practitioner.prefix + ' ' + practitioner.family + ' ' + practitioner.given + ' ' + practitioner.suffix;
        shareWithNames.push(practitionerName);
      });
    });
    this.notiService.notifications[index].shareWith = shareWithNames;
  }

  getMoreInformation(index: number): string {
    let tooltipString = '';
    let i = 0;
    this.events[index].shareWith.forEach(element => {
      if (i !== 0) {
        tooltipString = tooltipString + element + '\n';
      }
      i++;
    });
    return tooltipString;
  }

  openVisit(id: string) {
    this.dataService.selectedVisit = id;
    this._router.navigateByUrl('/examination');
  }

  async openStaff(id: string) {
    await this.practitionerService.getPractitioners(id).subscribe(data => {
      this.dataService.selectedStaffDetails = data as Practitioner;
      this.dataService.personDetails = true;
      this._router.navigateByUrl('/staff');
    });
  }

  share() {
    this.textAreaOpen = true;
  }

  close() {
    this.textAreaOpen = false;
  }

  async getPractitioners() {
    this.staff = [];
    this.staff = await this.practitionerService.getAllPractitioners();
    let i = 0;
    this.staff.forEach(element => {
      if (element.practitonerID === this.auth.loggedUser.practitonerID) {
        this.staff.splice(i, 1);
      }
      i++;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterPractitionersMulti() {
    if (!this.staff) {
      return;
    }
    let search = this.practitionersMultiFilterCtrl.value;
    if (!search) {
      this.filteredPractitionersMulti.next(this.staff.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredPractitionersMulti.next(
      this.staff.filter(practitioner => practitioner.name.toLowerCase().indexOf(search) > -1)
    );
  }

  getPractitionersName() {
    let i = 0;
    this.staff.forEach(element => {
      let name = '';
      name = element.prefix + ' ' + element.family + ' ' + element.given + ' ' + element.suffix;
      this.staff[i].name = name;
      i++;
    });
  }

  alternativeSortEvents() {
    this.events = [];
    let j = 0;
    this.notiService.notifications.forEach(noti => {
      this.events.push(noti);
      this.getNames(j);
      this.getPractitioner(noti.author);
      j++;
    });
    this.examinations.forEach(exa => {
      this.events.push(exa);
      this.getPractitioner(exa.practitionerID);
    });
    this.events.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    let index = 0;
    this.load = true;
  }

  async ngOnInit() {
    await this.auth.getUser();
    await this.getExaminations();
    await this.workgroupService.getWorkgroups().then(res => this.getWorkgroups && this.getPractitioners());
    await this.notiService.getNoti();
    this.getPractitionersName();
    this.getExaminationsData();
    this.alternativeSortEvents();
    this.filteredPractitionersMulti.next(this.staff.slice());
    this.onResize();
    this.practitionersMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPractitionersMulti();
      });
  }

}
