import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PassDataService } from 'src/app/services/pass-data.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { Examination } from 'src/app/interfaces/examination.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FillService } from 'src/app/services/fill.service';
import { Fill } from 'src/app/interfaces/fill.interface';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss'],
})
export class RankingsPage implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @Input() globalOrGroup: string;

  examinations = [];
  diagnoses = [];
  fills = [];
  filteredFills = [];
  tableDiagnoses = [];
  practitioners = [];
  tableData = [];
  dataSource;
  globalDataSource = [];
  workgroupDataSource = [];
  workgroupPractitioners = [];

  constructor(
    private dataService: PassDataService,
    private _router: Router,
    private examinationService: ExaminationService,
    private auth: AuthService,
    private fillService: FillService,
    private practitionerService: PractitionerService) { }

  displayedColumns: string[] = ['name', 'summary'];
  loaded;
  diagnose1;
  diagnose2;
  diagnose3;
  filterValue = '';

  async getExaminations() {
    let promise = new Promise((resolve, reject) => {
      let examinations = [];
      // tslint:disable-next-line: only-arrow-functions
      this.examinationService.getAllExaminations().onSnapshot(function(querySnapshot) {
        examinations = [];
        let i = 0;
        // tslint:disable-next-line: only-arrow-functions
        querySnapshot.forEach(function(doc) {
          examinations.push(doc.data());
          examinations[i].examinationID = doc.id;
          i++;
        });
        resolve(examinations)
      });
    });
    this.examinations = await promise as Examination[];
  }

  getNumberOfDiagnoses() {
    let q = 0;
    let j = 0;
    let o = 0;
    let diagnoses = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.examinations.length; i++) {
      q = 0;
      let numberOfDiagnoses = {
        examinationID: [],
        diagnose: '',
        diagnoseID: '',
        numberOf: 0
      }
      if (diagnoses.length === 0) {
        diagnoses.push(numberOfDiagnoses);
        diagnoses[j].numberOf++;
        diagnoses[j].diagnose = this.examinations[i].diagnostics;
        o = j + 1;
        diagnoses[j].diagnoseID = 'diagnose' + o;
        diagnoses[j].examinationID.push(this.examinations[i].examinationID);
        j++;
      } else {
        // tslint:disable-next-line: prefer-for-of
        for (let k = 0; k < diagnoses.length; k++) {
          if (diagnoses[k].diagnose === this.examinations[i].diagnostics) {
            diagnoses[k].numberOf++;
            diagnoses[k].examinationID.push(this.examinations[i].examinationID);
            q++;
          }
        }
        if (q === 0 && this.examinations[i].diagnostics != 'none') {
          diagnoses.push(numberOfDiagnoses);
          diagnoses[j].numberOf++;
          diagnoses[j].diagnose = this.examinations[i].diagnostics;
          o = j + 1;
          diagnoses[j].diagnoseID = 'diagnose' + o;
          diagnoses[j].examinationID.push(this.examinations[i].examinationID);
          j++;
        }
      }
    }
    diagnoses.forEach(element => {
      this.tableDiagnoses.push(element)
    });
    this.filterFills();
  }

  async getFills() {
    let promise = new Promise((resolve, reject) => {
      let fills = [];
      // tslint:disable-next-line: only-arrow-functions
      this.fillService.getAllFills().onSnapshot(function(querySnapshot) {
        fills = [];
        let i = 0;
        // tslint:disable-next-line: only-arrow-functions
        querySnapshot.forEach(function(doc) {
          fills.push(doc.data());
          fills[i].fillID = doc.id;
          i++;
        });
        resolve(fills);
      });
    });
    this.fills = await promise as Fill[];
  }

  async getPractitioners() {
    let promise = new Promise((resolve, reject) => {
      let practitioners = [];
      // tslint:disable-next-line: only-arrow-functions
      this.practitionerService.getAllPractitioner().onSnapshot(function(querySnapshot) {
        practitioners = [];
        let i = 0;
        querySnapshot.forEach(function (doc) {
          practitioners.push(doc.data());
          practitioners[i].practitionerID = doc.id
          if (practitioners[i].prefix === '' && practitioners[i].suffix !== '') {
            practitioners[i].name = practitioners[i].family + ' ' + practitioners[i].given + ' ' + practitioners[i].suffix;
          } else if (practitioners[i].suffix === '' && practitioners[i].prefix !== '') {
            practitioners[i].name = practitioners[i].prefix + ' ' + practitioners[i].family + ' ' + practitioners[i].given;
          } else if (practitioners[i].prefix === '' && practitioners[i].suffix === '') {
            practitioners[i].name = practitioners[i].family + ' ' + practitioners[i].given;
          } else {
            // tslint:disable-next-line: max-line-length
            practitioners[i].name = practitioners[i].prefix + ' ' + practitioners[i].family + ' ' + practitioners[i].given + ' ' + practitioners[i].suffix;
          }
          i++;
        });
        resolve(practitioners)
      });
    });
    this.practitioners = await promise as Practitioner[];
  }

  async getWorkgroupPractitioners() {
    let promise = new Promise((resolve, reject) => {
      // tslint:disable-next-line: only-arrow-functions
      this.practitionerService.getStaff().onSnapshot(function(querySnapshot) {
        let practitioners = [];
        let i = 0;
        // tslint:disable-next-line: only-arrow-functions
        querySnapshot.forEach(function(doc) {
          practitioners.push(doc.data());
          practitioners[i].practitionerID = doc.id
          if (practitioners[i].prefix === '' && practitioners[i].suffix !== '') {
            practitioners[i].name = practitioners[i].family + ' ' + practitioners[i].given + ' ' + practitioners[i].suffix;
          } else if (practitioners[i].suffix === '' && practitioners[i].prefix !== '') {
            practitioners[i].name = practitioners[i].prefix + ' ' + practitioners[i].family + ' ' + practitioners[i].given;
          } else if (practitioners[i].prefix === '' && practitioners[i].suffix === '') {
            practitioners[i].name = practitioners[i].family + ' ' + practitioners[i].given;
          } else {
            // tslint:disable-next-line: max-line-length
            practitioners[i].name = practitioners[i].prefix + ' ' + practitioners[i].family + ' ' + practitioners[i].given + ' ' + practitioners[i].suffix;
          }
          i++;
        });
        resolve(practitioners);
      });
    });
    this.workgroupPractitioners = await promise as Practitioner[];
  }


  filterFills() {
    let temp = [];
    let tempArray = [];
    let i = 0;
    let j = 0;
    this.practitioners.forEach(practitioner => {
      let stat = {
        practitionerID: practitioner.practitionerID,
        practitionerName: practitioner.name,
        diagnoseStats: []
      };
      this.tableDiagnoses.forEach(element => {
        let obj = {
          diagnose: element.diagnose,
          numberOfCorrect: 0,
          all: 0
        };
        stat.diagnoseStats.push(obj);
      });
      tempArray.push(stat);
    });
    this.getStats(tempArray)
  }

  getStats(arrayOfStats: any) {
    let i = 0;
    let j = 0;
    arrayOfStats.forEach(element => {
      j = 0;
      element.diagnoseStats.forEach(statElement => {
        this.examinations.forEach(examination => {
          if (statElement.diagnose === examination.diagnostics) {
            this.fills.forEach(fill => {
              if (element.practitionerID === fill.practitionerID && examination.examinationID === fill.examinationID) {
                if (fill.diagnose === statElement.diagnose) {
                  arrayOfStats[i].diagnoseStats[j].numberOfCorrect++;
                  arrayOfStats[i].diagnoseStats[j].all++;
                } else {
                  arrayOfStats[i].diagnoseStats[j].all++;
                }
              }
            });
          }
        });
        j++;
      });
      i++;
    });
    this.createDataSource(arrayOfStats);
  }

  filterByWorkgroup(globalDataSource: any[]) {
    globalDataSource.forEach(data => {
      this.workgroupPractitioners.forEach(practitioner => {
        if (data.practitionerID === practitioner.practitionerID) {
          this.workgroupDataSource.push(data);
        }
      });
    })
  }

  createDataSource(arrayOfStats: any[]) {
    let temp = [];
    let j = 0;
    let q = 0;
    let sum = 0;
    arrayOfStats.forEach(element => {
      sum = 0;
      q = 0;
      let obj = {
        practitionerID: element.practitionerID,
        name: element.practitionerName,
        summary: ''
      }
      let i = 1;
      element.diagnoseStats.forEach(stat => {
        // tslint:disable-next-line: triple-equals
        if (stat.all != 0) {
          obj['diagnose' + i] = ((stat.numberOfCorrect / stat.all) * 100).toFixed();
          sum = sum + ((stat.numberOfCorrect / stat.all) * 100);
          q++;

        } else {
          obj['diagnose' + i] = '-';
        }
        if (j === 1) {
          this.displayedColumns.push('diagnose' + i);
        }
        if (i === element.diagnoseStats.length) {
          if (q !== 0) {
            sum = sum / q;
          } else {
            sum = 0;
          }
          obj.summary = sum.toFixed();
        }
        i++;
      });
      temp.push(obj);
      j++;
    });
    this.displayedColumns.push('star');
    this.globalDataSource = temp;
    this.filterByWorkgroup(temp);
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue;
  }

  setDataSource() {
    if (this.dataService.selectedTab === 'Országos rangsor') {
      this.dataSource = new MatTableDataSource(this.globalDataSource);
    } else if (this.dataService.selectedTab === 'Munkacsoport rangsor') {
      this.dataSource = new MatTableDataSource(this.workgroupDataSource);
    } else if (this.dataService.selectedTab === 'Elemzések') {
      this.dataSource = new MatTableDataSource(this.globalDataSource);
    }
    this.loaded = Promise.resolve(true);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
    return this.dataSource;
  }

  async ngOnInit() {
    this.displayedColumns = ['name', 'summary'];
    this.tableDiagnoses = [];
    this.tableData = [];
    await this.auth.getUser();
    await this.getExaminations();
    await this.getFills();
    await this.getPractitioners();
    await this.getWorkgroupPractitioners();
    this.getNumberOfDiagnoses();
  }

}
