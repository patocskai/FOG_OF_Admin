import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PassDataService } from 'src/app/services/pass-data.service';
import { MatDialog } from '@angular/material';
import { WarningDialogPage } from './warning-dialog/warning-dialog.page';
import { FillDetailsPage } from './fill-details/fill-details.page';
import { ExaminationService } from 'src/app/services/examination.service';
import { Examination } from 'src/app/interfaces/examination.interface';
import { DatePipe } from '@angular/common';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FillService } from 'src/app/services/fill.service';
import { Fill } from 'src/app/interfaces/fill.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-examination-details',
  templateUrl: './examination-details.page.html',
  styleUrls: ['./examination-details.page.scss'],
})
export class ExaminationDetailsPage implements OnInit {  
  @Input() visit: any = {};
  @Output() public close = new EventEmitter<Boolean>();
  @Output() public updateDiagnose = new EventEmitter<any>();
  @Output() public deleteVisit = new EventEmitter<any>();
  @Output() public closeExaminationDetails = new EventEmitter<any>();

  diagnoseFormControl = new FormControl('');
  visitDetails = true;
  fills = false;
  img1Src: Observable<any>;
  img2Src = '../../../assets/picture1a.jpg';
  selectedVal = 'visitDetails';
  selectedDiagnose = '';
  selectedPerson = {};
  practitioner: Practitioner;
  today = new Date();
  selectedExamination: Examination;
  diagnoses: string[] = this.diagService.diagList;
  public pieChartLabels: string[] = ['Melanóma', 'Naevus', 'Basalioma', 'Laphámcarcinoma in situ/invazív', 'Dermatofibroma'];
  public pieChartType = 'pie';
  displayedColumns: string[] = ['position', 'name', 'date', 'diagnose', 'comment'];
  imgUrls = [];
  allFill = [];
  allFills = [];
  diagnosed = 0;
  undiagnosed = 0;
  pieChartCategories: string[] = [];
  pieChartData: number[] = [];
  diagnosedPieChartData = [0, 0, 0];
  diagnosedPieChartCategories = ['Helyes', 'Helytelen', 'Nem adott meg diagnózist'];
  details = false;
  fillDetails = false;
  status = false;
  diagnose = '';
  clinicalDiagnose = '';
  userFill: Fill;
  q = 0;
  r = false;
  load = Promise.resolve(false);
  showName = false;
  showDelete = false;
  @ViewChild(FillDetailsPage, {static: false}) child: FillDetailsPage;

  pieChart1 = {
    title: {
      text: 'DIAGNÓZISOK MEGOSZLÁSA',
      display: true
    }
  };

  pieChart2 = {
    title: {
      text: 'HELYES/HELYTELEN DIAGNÓZISOK ARÁNYA',
      display: true
    }
  };

  scoreType: any = 'none';
  scoreForm: FormGroup;
  scoreLabel: String;
  ps = 0;

  constructor(private _router: Router,
    private dataService: PassDataService,
    private dialog: MatDialog,
    private examinationService: ExaminationService,
    private datepipe: DatePipe,
    private practitionerService: PractitionerService,
    private afStorage: AngularFireStorage,
    private fillService: FillService,
    private auth: AuthService,
    private diagService: DiagnosisService,
    public fb: FormBuilder
  ) { }

  scoreAlgorithm() {
    this.resetform();
    this.scores();
  }

  resetform() {
    this.scoreForm = this.fb.group({
      apn: ['', [Validators.required]],
      bwv: ['', [Validators.required]],
      avp: ['', [Validators.required]],
      ib: ['', [Validators.required]],
      is: ['', [Validators.required]],
      idg: ['', [Validators.required]],
      rs: ['', [Validators.required]],
      asy: ['', [Validators.required]],
      loc: ['', [Validators.required]],
      max_d: ['', [Validators.required]],
      ages: ['', [Validators.required]]
    });
  }

  scores() {
    if (this.scoreType === '7PCL') {
      let score = 0;
      let apn = 0;
      let bwv = 0;
      let avp = 0;
      let ib = 0;
      let is = 0;
      let idg = 0;
      let rs = 0;
      let ps = 0;
      let psarray = {
        apnps: 0,
        bwnps: 0,
        avpps: 0,
        ibps: 0,
        isps: 0,
        idgps: 0,
        rsps: 0,
      }
      if (this.scoreForm.get('apn').value === 'yes') {
        apn = 2;
        psarray.apnps++;
      }
      else if (this.scoreForm.get('apn').value === 'no') {
        apn = 0;
        if (psarray.apnps > 0) {
          psarray.apnps--;
        }
      }
      if (this.scoreForm.get('bwv').value === 'yes') {
        bwv = 2;
        psarray.bwnps++;
      }
      else if (this.scoreForm.get('bwv').value === 'no') {
        bwv = 0;
        if (psarray.bwnps > 0) {
          psarray.bwnps--;
        }
      }
      if (this.scoreForm.get('avp').value === 'yes') {
        avp = 2;
        psarray.avpps++;
      }
      else if (this.scoreForm.get('avp').value === 'no') {
        avp = 0;
        if (psarray.avpps > 0) {
          psarray.avpps--;
        }
      }
      if (this.scoreForm.get('ib').value === 'yes') {
        ib = 1;
        psarray.ibps++;
      }
      else if (this.scoreForm.get('ib').value === 'no') {
        ib = 0;
        if (psarray.ibps > 0) {
          psarray.ibps--;
        }
      }
      if (this.scoreForm.get('is').value === 'yes') {
        is = 1;
        psarray.isps++;
      }
      else if (this.scoreForm.get('is').value === 'no') {
        is = 0;
        if (psarray.isps > 0) {
          psarray.isps--;
        }
      }
      if (this.scoreForm.get('idg').value === 'yes') {
        idg = 1;
        psarray.idgps++;
      }
      else if (this.scoreForm.get('idg').value === 'no') {
        idg = 0;
        if (psarray.idgps > 0) {
          psarray.idgps--;
        }
      }
      if (this.scoreForm.get('rs').value === 'yes') {
        rs = 1;
        psarray.rsps++;
      }
      else if (this.scoreForm.get('rs').value === 'no') {
        rs = 0;
        if (psarray.rsps > 0) {
          psarray.rsps--;
        }
      }
      score = apn + bwv + avp + ib + is + idg + rs;
      ps = psarray.apnps + psarray.bwnps + psarray.avpps + psarray.ibps + psarray.isps + psarray.idgps + psarray.rsps;
      this.ps = ps;
      if (score < 3) {
        this.scoreLabel = 'benignus melanocytás elváltozás';
      }
      else {
        this.scoreLabel = 'melanoma malignum';
      }
    }
    if (this.scoreType === 'new7PCL') {
      let score = 0;
      let apn = 0;
      let bwv = 0;
      let avp = 0;
      let ib = 0;
      let is = 0;
      let idg = 0;
      let rs = 0;
      let ps = 0;
      let psarray = {
        apnps: 0,
        bwnps: 0,
        avpps: 0,
        ibps: 0,
        isps: 0,
        idgps: 0,
        rsps: 0,
      }
      if (this.scoreForm.get('apn').value === 'yes') {
        apn = 1;
        psarray.apnps++;
      }
      if (this.scoreForm.get('apn').value === 'no') {
        apn = 0;
        if (psarray.apnps > 0) {
          psarray.apnps--;
        }
      }
      if (this.scoreForm.get('bwv').value === 'yes') {
        bwv = 1;
        psarray.bwnps++;
      }
      if (this.scoreForm.get('bwv').value === 'no') {
        bwv = 0;
        if (psarray.bwnps > 0) {
          psarray.bwnps--;
        }
      }
      if (this.scoreForm.get('avp').value === 'yes') {
        avp = 1;
        psarray.avpps++;
      }
      if (this.scoreForm.get('avp').value === 'no') {
        avp = 0;
        if (psarray.avpps > 0) {
          psarray.avpps--;
        }
      }
      if (this.scoreForm.get('ib').value === 'yes') {
        ib = 1;
        psarray.ibps++;
      }
      if (this.scoreForm.get('ib').value === 'no') {
        ib = 0;
        if (psarray.ibps > 0) {
          psarray.ibps--;
        }
      }
      if (this.scoreForm.get('is').value === 'yes') {
        is = 1;
        psarray.isps++;
      }
      if (this.scoreForm.get('is').value === 'no') {
        is = 0;
        if (psarray.isps > 0) {
          psarray.isps--;
        }
      }
      if (this.scoreForm.get('idg').value === 'yes') {
        idg = 1;
        psarray.idgps++;
      }
      if (this.scoreForm.get('idg').value === 'no') {
        idg = 0;
        if (psarray.idgps > 0) {
          psarray.idgps--;
        }
      }
      if (this.scoreForm.get('rs').value === 'yes') {
        rs = 1;
        psarray.rsps++;
      }
      if (this.scoreForm.get('rs').value === 'no') {
        rs = 0;
        if (psarray.rsps > 0) {
          psarray.rsps--;
        }
      }
      score = apn + bwv + avp + ib + is + idg + rs;
      ps = psarray.apnps + psarray.bwnps + psarray.avpps + psarray.ibps + psarray.isps + psarray.idgps + psarray.rsps;
      this.ps = ps;
      if (score >= 1) {
        this.scoreLabel = 'excisió';
      }
      else {
        this.scoreLabel = '';
      }
    }
    if (this.scoreType === '3-point-checklist') {
      let score = 0;
      let asy = 0;
      let apn = 0;
      let bwv = 0;
      if (this.scoreForm.get('apn').value === 'yes') {
        apn = 1;
      }
      if (this.scoreForm.get('apn').value === 'no') {
        apn = 0;
      }
      if (this.scoreForm.get('bwv').value === 'yes') {
        bwv = 1;
      }
      if (this.scoreForm.get('bwv').value === 'no') {
        bwv = 0;
      }
      if (this.scoreForm.get('asy').value === 'yes') {
        asy = 1;
      }
      if (this.scoreForm.get('asy').value === 'no') {
        asy = 0;
      }
      score = asy + apn + bwv;
      if (score > 1) {
        this.scoreLabel = 'lesion';
      }
      else {
        this.scoreLabel = '';
      }
    }
    if (this.scoreType === 'iDScore') {
      let score = 0;
      let apn = 0;
      let bwv = 0;
      let avp = 0;
      let ib = 0;
      let is = 0;
      let idg = 0;
      let rs = 0;
      let loc = 0;
      let max_d = 0;
      let ages = 0;
      if (this.scoreForm.get('apn').value === 'yes') {
        apn = 1;
      }
      if (this.scoreForm.get('apn').value === 'no') {
        apn = 0;
      }
      if (this.scoreForm.get('bwv').value === 'yes') {
        bwv = 1;
      }
      if (this.scoreForm.get('bwv').value === 'no') {
        bwv = 0;
      }
      if (this.scoreForm.get('avp').value === 'yes') {
        avp = 1;
      }
      if (this.scoreForm.get('avp').value === 'no') {
        avp = 0;
      }
      if (this.scoreForm.get('ib').value === 'yes') {
        ib = 1;
      }
      if (this.scoreForm.get('ib').value === 'no') {
        ib = 0;
      }
      if (this.scoreForm.get('is').value === 'yes') {
        is = 1;
      }
      if (this.scoreForm.get('is').value === 'no') {
        is = 0;
      }
      if (this.scoreForm.get('idg').value === 'yes') {
        idg = 1;
      }
      if (this.scoreForm.get('idg').value === 'no') {
        idg = 0;
      }
      if (this.scoreForm.get('rs').value === 'yes') {
        rs = 1;
      }
      if (this.scoreForm.get('rs').value === 'no') {
        rs = 0;
      }
      if (this.scoreForm.get('loc').value === 'Felső végtagok') {
        loc = 2;
      }
      if (this.scoreForm.get('loc').value === 'Alsó végtagok') {
        loc = 2;
      }
      if (this.scoreForm.get('loc').value === 'Felsőtest') {
        loc = 1;
      }
      if (this.scoreForm.get('max_d').value === '6 - 10mm') {
        max_d = 3;
      }
      if (this.scoreForm.get('max_d').value === 'nagyobb mint 11 mm') {
        max_d = 4;
      }
      if (this.scoreForm.get('ages').value === '30-40') {
        ages = 1;
      }
      if (this.scoreForm.get('ages').value === '41-60') {
        ages = 2;
      }
      if (this.scoreForm.get('ages').value === 'több mint 61 éves') {
        ages = 3;
      }
      score = apn + bwv + avp + ib + is + idg + rs + loc + max_d + ages;
      if (score >= 0 && score <= 5) {
        this.scoreLabel = 'Nem merül fel malignitás';
      }
      if (score >= 6 && score <= 7) {
        this.scoreLabel = 'Alacsony a malignitás kockázata';
      }
      if (score >= 8 && score <= 10) {
        this.scoreLabel = 'Közepes a malignitás kockázata';
      }
      if (score >= 11 && score <= 16) {
        this.scoreLabel = 'Magas a malignitás kockázata';
      }
    }
  }

  updatePersonalDiagnose(diagnose: string) {
    this.userFill.diagnose = diagnose;
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

   openFillDetails(person: any) {
     if (this.q > 0) {
       this.child.getSelectedPerson(person);
     } else {
       this.selectedPerson = person;
     }
     this.ocFillDetails(true);
     this.q++;
   }

  ocFillDetails(event: boolean) {
    if (event === false) {
      this.q = 0;
    }
    this.fillDetails = event;
  }

  closeDetails() {
    this.closeExaminationDetails.emit(false);
  }

  openDetails() {
    this.details = true;
  }

  onClickDelete() {
    const dialogRef = this.dialog.open(WarningDialogPage, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete();
      }
    });
  }

  getPractitioner(id: string) {
    this.practitionerService.getPractitioners(id).subscribe(data => {
      this.practitioner = data as Practitioner;
      const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

      if (
        loggedIn.roles.includes('admin') ||
        loggedIn.roles.includes('specialist')
      ) {
        this.showDelete = true;
      } else {
        this.showDelete = false;
      }

      // tslint:disable-next-line: triple-equals
      if (loggedIn.email == this.practitioner.email) {
        this.showName = true;
      } else {
        this.showName = false;
      }

    });
  }

  openStaff(doctor: any) {
    this.dataService.selectedStaff = doctor;
    this._router.navigateByUrl('/staff');
  }

  loadSelectedVisit(visit: any) {
    this.visit = visit;
  }

  updateClinicalDiagnoseValue(newDiagnose: any) {
    this.clinicalDiagnose = newDiagnose;
  }

  async save() {
    this.imgUrls = [];
    this.examinationService.updateExaminationDiagnose(this.dataService.selectedVisit, this.diagnose, this.clinicalDiagnose);
    this.fillService.updateFill(this.userFill.fillID, this.userFill.diagnose);
    this.diagnose = '';
    this.clinicalDiagnose = '';
    this.closeDetails();
  }

  delete() {
    this.deleteVisit.emit(this.visit);
    this.closeDetails();
  }

  async getUserFill() {
    let fill: Fill;
    let promise = new Promise((resolve, reject) => {
      this.fillService.getUserFillForExamination(this.dataService.selectedVisit).then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          fill = doc.data() as Fill;
          fill.fillID = doc.id;
        });
        resolve(fill)
      });
    });
    this.userFill = await promise as Fill;
  }

  async getFills() {
    let promise = new Promise((resolve, reject) => {
      let fills = [];
      this.fillService.getFills2().then(function (querySnapshot) {
        fills = [];
        let i = 0;
        querySnapshot.forEach(function (doc) {
          fills.push(doc.data());
          fills[i].fillID = doc.id
          i++
        });
        resolve(fills)
      });
    });
    this.allFills = await promise as Fill[];
  }
  async getFills2() {
    let fills = [];
    this.fillService.getFills().onSnapshot(function (querySnapshot) {
      fills = [];
      let i = 0;
      querySnapshot.forEach(function (doc) {
        fills.push(doc.data());
        fills[i].fillID = doc.id
        i++
      });
      this.allFills = fills;
    });
  }

  async getFillsData(selectedExaminationID: string) {
    let fills = [];
    let practitioner: Practitioner;
    let correctDiagnose = 0;
    let uncorrectDiagnose = 0;
    this.allFills.forEach(fill => {
      if (fill.examinationID === selectedExaminationID) {
        fills.push(fill);
      }
    });
    fills.forEach(element => {
      correctDiagnose = 0;
      uncorrectDiagnose = 0;
      this.practitionerService.getPractitioners(element.practitionerID).subscribe(data => {
        practitioner = data as Practitioner;
        const pr = {
          practitionerName: practitioner.prefix + ' ' + practitioner.family + ' ' + practitioner.given + ' ' + practitioner.suffix,
          practitionerDiagnose: element.diagnose
        };
        if (this.selectedExamination.diagnostics !== 'none') {
          if (this.selectedExamination.diagnostics === pr.practitionerDiagnose) {
            this.diagnosedPieChartData[0]++;
          }
          if (this.selectedExamination.diagnostics !== pr.practitionerDiagnose && pr.practitionerDiagnose !== 'none') {
            this.diagnosedPieChartData[1]++;
          } if (pr.practitionerDiagnose == 'none') {
            this.diagnosedPieChartData[2]++;
          }
        }
        if (pr.practitionerDiagnose === 'none') {
          this.undiagnosed++;
        } else {
          let q = 0;
          this.pieChartCategories.forEach(ele => {
            if (ele === pr.practitionerDiagnose) {
              q++;
            }
          });
          if (q === 0) {
            let db = 0;
            this.pieChartCategories.push(pr.practitionerDiagnose);
            fills.forEach(elem => {
              if (elem.diagnose === pr.practitionerDiagnose) {
                db++;
              }
            });
            this.pieChartData.push(db);
          }
          this.diagnosed++;
        }
        this.allFill.push(pr);
      });
    });
  }

  async getExaminationDetails() {
    return new Promise((resolve, reject) => {
      const converted = this.datepipe.transform(this.today, 'yyyy-MM-dd');
      this.examinationService.getExaminationsByID(this.dataService.selectedVisit).subscribe(data => {
        if (data) {
          this.selectedExamination = data as Examination;
          this.getPractitioner(this.selectedExamination.practitionerID);
          if (new Date(this.selectedExamination.creationDate).getTime() < new Date(converted).getTime() && new Date(this.selectedExamination.expirationDate).getTime() >= new Date(converted).getTime()) {
            this.status = true;
          }
          for (let i = 0; i < this.selectedExamination.basicImg.length; i++) {
            const ref = this.afStorage.ref(this.selectedExamination.basicImg[i]);
            ref.getDownloadURL().subscribe(dataa => {
              this.imgUrls.push(dataa);
            });
          }
          for (let i = 0; i < this.selectedExamination.dermaImg.length; i++) {
            const ref2 = this.afStorage.ref(this.selectedExamination.dermaImg[i]);
            ref2.getDownloadURL().subscribe(dataa => {
              this.imgUrls.push(dataa);
            });
          }
        } else {
          this.closeDetails();
        }
      });
      resolve();
      this.getFillsData(this.dataService.selectedVisit);
    });
  }

  async ngOnInit() {
    await this.getFills();
    await this.getExaminationDetails();
    await this.getUserFill().then(resolve => this.load = Promise.resolve(true))
    this.getFills2();
    this.resetform();
  }

  deleteExam() {
    if (confirm('Biztos törli?')) {
      this.fillService.deleteFillsByExamID(this.selectedExamination.examinationID).then((deleted) => {
        console.log(deleted, ' fills deleted');
        this.selectedExamination.basicImg.forEach((img) => {
          this.examinationService.deleteIMG(img).then((ok) => {
            console.log(img, ' deleted');
          }).catch((error) => {
            console.error(error);
          });
        });
        this.selectedExamination.dermaImg.forEach((img) => {
          this.examinationService.deleteIMG(img).then((ok) => {
            console.log(img, ' deleted');
          }).catch((error) => {
            console.error(error);
          });
        });
        this.examinationService.deleteExam(this.selectedExamination.examinationID).then((ok) => {
          console.log(this.selectedExamination.examinationID, ' examination deleted');
        }).catch((error) => {
          console.error(error);
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }

}
