import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { Examination } from 'src/app/interfaces/examination.interface';
import { PassDataService } from 'src/app/services/pass-data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Moment } from 'moment';
import { DatePipe } from '@angular/common';
import { NgxDateRangePickerOptions } from 'ngx-daterangepicker';
import { DiagnosisService } from 'src/app/services/diagnosis.service';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public isLoading = false) { }
}

@Component({
  selector: 'app-examination',
  templateUrl: './examination.page.html',
  styleUrls: ['./examination.page.scss'],
})
export class ExaminationPage implements OnInit {
  examinations: Examination[] = [];
  exas: Examination[] = [];
  filteredExaminations: Examination[] = [];
  undiagnosedExaminations: Examination[] = [];
  diagnosticsCat = [];
  examinationDetails = false;
  diagnoseCategories = [];
  expandCategories = [];
  expandDiagnosed = false;
  expandUndiagnosed = false;
  datePickerCols = 0;
  breakpoint = 0;
  practitionerFilterCols = 0;
  rowspan = 0;
  dateRangeBool = false;
  radioGroup = 'creationDate';
  windowWidth = window.innerWidth;
  selectedTab = '';
  loaded;
  editDiagnose = [];
  tempDiagnoses = [];
  histoData = [];
  slider = false;
  options: NgxDateRangePickerOptions;
  protected staff: Practitioner[] = [];
  public practitionersMultiCtrl: FormControl = new FormControl();
  public contentCtrl: FormControl = new FormControl();
  public practitionersMultiFilterCtrl: FormControl = new FormControl();
  public filteredPractitionersMulti: ReplaySubject<Practitioner[]> = new ReplaySubject<Practitioner[]>(1);
  @ViewChild('multiSelect', {static: false}) multiSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  @Input() placeholderLabel = 'Keresés';
  selected: { startDate: Moment, endDate: Moment };
  filterOptions = [];
  dateRange = { from: new Date(), to: new Date() };
  startDate: string;
  endDate: string;
  filterDateOptions = 'creationDate';
  diagnose = '';
  personalDiagnose = '';
  diagnoses: string[] = this.diagService.diagList;
  constructor(
    private examinationService: ExaminationService,
    private dataService: PassDataService,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private practitionerService: PractitionerService,
    private auth: AuthService,
    private datePipe: DatePipe,
    private diagService: DiagnosisService
  ) {
    this.options = {
      theme: 'default',
      labels: ['Kezdete', 'Vége'],
      menu: [
        { alias: 'td', text: 'Ma', operation: '0d' },
        { alias: 'tw', text: 'Ezen a héten', operation: '0w' },
        { alias: 'lw', text: 'Múlt héten', operation: '-1w' },
        { alias: 'tm', text: 'Ebben a hónapban', operation: '0m' },
        { alias: 'lm', text: 'Múlt hónapban', operation: '-1m' },
        { alias: 'ty', text: 'Ebben az évben', operation: '0y' },
        { alias: 'ly', text: 'Előző évben', operation: '-1y' }
      ],
      dateFormat: 'YYYY-MM-DD',
      outputFormat: 'YYYY-MM-DD',
      startOfWeek: 0,
      outputType: 'object',
      locale: 'hu',
      date: this.dateRange
    };

    // tslint:disable-next-line: max-line-length
    // var basediags = ['Melanóma', 'Naevus', 'Basalioma', 'Laphámcarcinoma in situ/invazív', 'Dermatofibroma', 'Verruca seborrhoica/solaris lentigo', 'Éreredetű elváltozás', 'Egyéb-itt: fertőző betegség', 'Papulosquamosus/ekzematifotm', 'Dermatosisok', 'Egyéb malignus elváltozás', 'Egyéb jóindulatú elváltozás', 'Eltérések/mechanikus irritatio okozta eltérések', 'Fertőző betegség', 'Papulosquamosus/ekzematifotm dermatosisok', 'Pigmentációs eltérések/mechanikus irritatio okozta eltérése'];
    // basediags.forEach((diag, index) => {
    //   this.diagService.addDiagnosis(diag, index + 1).then((ok) => {
    //     console.log(ok);
    //   }).catch((error) => {
    //     console.error(error);
    //   });
    // });

  }

  updateTempDiagnose(diagnose: string, index: number) {
    this.tempDiagnoses[index] = diagnose;
  }

  saveDiagnose(index: number, id: string) {
    this.examinationService.updateExaminationDiagnose(id, this.tempDiagnoses[index], '');
  }

  addDiagnose(index: number) {
    this.editDiagnose[index] = true;
  }

  rejectChanges(index: number) {
    this.tempDiagnoses[index] = 'none';
    this.editDiagnose[index] = false;
  }

  async filterExaminationByDate() {
    let temp = [];
    this.exas.forEach(element => {
      if (this.filterDateOptions === 'expirationDate') {
        // tslint:disable-next-line: max-line-length
        if ((new Date(element.expirationDate).getTime() > new Date(this.startDate).getTime()) && (new Date(element.expirationDate).getTime() < new Date(this.endDate).getTime())) {
          temp.push(element);
        }
      // tslint:disable-next-line: max-line-length
      } else if (new Date(element.creationDate).getTime() > new Date(this.startDate).getTime() && new Date(element.creationDate).getTime() < new Date(this.endDate).getTime()) {
        temp.push(element); {
        }
      }
    });
    this.filteredExaminations = temp;
    this.addPractitionerToFilter();
  }

  updateFilterValue(value: string) {
    this.filterDateOptions = value;
    this.filterExaminationByDate();
  }

  setDateRange() {
    var date = new Date();
    var date2 = new Date();
    date.setDate(date.getDate() - 31);
    this.dateRange.from = date;
    date2.setDate(date2.getDate() + 62);
    this.dateRange.to = date2;
    this.startDate = this.datePipe.transform(new Date(this.dateRange.from), 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(new Date(this.dateRange.to), 'yyyy-MM-dd');
  }

  public setReturnValue(dateRange: any): any {
    this.dateRange = dateRange;
    this.startDate = this.datePipe.transform(new Date(this.dateRange.from), 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(new Date(this.dateRange.to), 'yyyy-MM-dd');
    this.filterExaminationByDate();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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

  clickDiagnosed() {
    if (this.expandDiagnosed === false) {
      this.expandDiagnosed = true;
    } else {
      this.expandDiagnosed = false;
    }
  }

  clickUndiagnosed() {
    if (this.expandUndiagnosed === false) {
      this.expandUndiagnosed = true;
    } else {
      this.expandUndiagnosed = false;
    }
  }

  clickCategories(index: number) {
    if (this.expandCategories[index] === false) {
      this.expandCategories[index] = true;
    } else {
      this.expandCategories[index] = false;
    }
  }

  async getExaminations() {
    let promise = new Promise((resolve, reject) => {
      let examinations = [];
      // tslint:disable-next-line: only-arrow-functions
      this.examinationService.getExaminations().onSnapshot(function (querySnapshot) {
        examinations = [];
        let i = 0;
        // tslint:disable-next-line: only-arrow-functions
        querySnapshot.forEach(function (doc) {
          examinations.push(doc.data());
          examinations[i].examinationID = doc.id
          i++
        });
        resolve(examinations)
      });
    });
    this.examinations = await promise as Examination[];
    this.exas = await promise as Examination[];
    this.filteredExaminations = await promise as Examination[]
  }

  getExaCategories() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.examinations.length; i++) {
      if (this.diagnosticsCat.length === 0) {
        this.diagnosticsCat.push(this.examinations[i].diagnostics);
      } else {
        let q = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.diagnosticsCat.length; j++) {
          if (this.diagnosticsCat[j] === this.examinations[i].diagnostics) {
            q++;
          }
        }
        if (q === 0) {
          this.diagnosticsCat.push(this.examinations[i].diagnostics);
        }
      }
    }
  }

  // tslint:disable-next-line: ban-types
  getExaminationsByDiagnose(category: String) {
    const diagnosedExaminations = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.examinations.length; i++) {
      if (this.examinations[i].diagnostics === category) {
        diagnosedExaminations.push(this.examinations[i]);
      }
    }
    return diagnosedExaminations;
  }

  getDiagnosedExaminations() {
    let q = 0;
    this.diagnoseCategories = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.examinations.length; i++) {
      if (this.examinations[i].diagnostics !== 'none') {
        q = 0;
        this.diagnoseCategories.forEach(element => {
          if (element === this.examinations[i].diagnostics) {
            q++;
          }
        });
        if (q === 0) {
          this.diagnoseCategories.push(this.examinations[i].diagnostics);
          this.expandCategories.push(false);
        }
      }
    }
  }

  getUndiagnosedExaminations() {
    this.undiagnosedExaminations = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.examinations.length; i++) {
      if (this.examinations[i].diagnostics === 'none') {
        this.undiagnosedExaminations.push(this.examinations[i]);
      }
    }
  }

  openVisit(id: string) {
    this.dataService.selectedVisit = id;
    this.examinationDetails = true;
  }

  async closeDetails(event: any) {
    this.examinationDetails = false;
  }

  async getPractitioners() {
    this.staff = [];
    this.staff = await this.practitionerService.getAllPractitioners();
  }

  addPractitionerToFilter() {
    let filter = this.practitionersMultiCtrl.value;
    if (filter === null || filter.length === 0) {
      this.examinations = this.filteredExaminations;
    }
    if (this.filteredExaminations !== null && filter !== null && filter.length !== 0) {
      this.examinations = [];
      let temporaryExa = [];
      this.filteredExaminations.forEach(element => {
        filter.forEach(filterBy => {
          if (element.practitionerID === filterBy.practitonerID) {
            temporaryExa.push(element);
          }
        })
      });
      if (this.practitionersMultiCtrl === null) {
        this.examinations = this.filteredExaminations;
      } else {
        this.examinations = temporaryExa;
      }
    }
    this.getDiagnosedExaminations();
    this.getUndiagnosedExaminations();
    this.filterHistoData();
  }

  setLayout() {
    if (this._router.url === '/histological') {
      this.selectedTab = 'Szövettani diagnózis';
    } else {
      this.selectedTab = 'Vizsgálatok';
    }
    this.loaded = Promise.resolve(true);
  }

  filterHistoData() {
    this.tempDiagnoses = [];
    this.editDiagnose = [];
    if (this.slider) {
      this.histoData = [];
      this.histoData.push(...this.examinations);
    } else if (!this.slider) {
      this.histoData = this.undiagnosedExaminations;
    }
    this.histoData.forEach(element => {
      this.editDiagnose.push(false);
      if (element.diagnostics !== 'none') {
        this.tempDiagnoses.push(element.diagnostics);
      } else {
        this.tempDiagnoses.push('none');
      }
    });
  }

  updateHistoData(event) {
    this.slider = event.checked;
    this.filterHistoData();
  }

  updateDiagnoseValue(newDiagnose: any) {
    this.diagnose = newDiagnose;
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  async ngOnInit() {
    this.setDateRange();
    this.filterOptions = [
      { value: 'creationDate', viewValue: 'Létrehozás dátum' },
      { value: 'expirationDate', viewValue: 'Lejárati dátum' }
    ];
    await this.auth.getUser();
    await this.getExaminations();
    this.getExaCategories();
    await this.getPractitioners();
    this.getPractitionersName();
    this.filterExaminationByDate();
    this.setLayout();
    if (this.dataService.selectedVisit !== '') {
      this.examinationDetails = true;
    }
    this.filteredPractitionersMulti.next(this.staff.slice());
    this.practitionersMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPractitionersMulti();
      });
    this.histoData = this.undiagnosedExaminations;
    this.histoData.forEach(element => {
      this.editDiagnose.push(false);
      if (element.diagnostics !== 'none') {
        this.tempDiagnoses.push(element.diagnostics);
      } else {
        this.tempDiagnoses.push('none');
      }
    });
  }
}
