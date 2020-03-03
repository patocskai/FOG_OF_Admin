import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { Examination } from 'src/app/interfaces/examination.interface';
import { FillService } from 'src/app/services/fill.service';
import { Fill } from 'src/app/interfaces/fill.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  examinations: Examination[] = [];
  fills: Fill[] = [];
  allFills = [];
  correctDiagnoses = [];
  uncorrectDiagnoses = [];
  drawCorrectChart = false;
  drawUncorrectChart = false;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['1. hét', '2. hét', '3. hét', '4. hét', '5. hét', '6. hét', '7. hét'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Adatsor 1' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Adatsor 2' }
  ];

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';

  correctPieChartOption = {
    title: {
      text: 'HELYESEN LEADOTT DIAGNÓZISOK MEGOSZLÁSA',
      display: true
    },
    responsive: true
  };

  public uncorrectPieChartLabels: string[] = [];
  public uncorrectPieChartData: number[] = [];
  uncorrectPieChartOption = {
    title: {
      text: 'HELYTELENÜL LEADOTT DIAGNÓZISOK MEGOSZLÁSA',
      display: true
    },
    responsive: true
  };

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  constructor(
    private examinationService: ExaminationService,
    private fillService: FillService,
    private auth: AuthService,
    public datepipe: DatePipe) { }

  async getExaminations() {
    let promise = new Promise((resolve, reject) => {
      let examinations = [];
      // tslint:disable-next-line: only-arrow-functions
      this.examinationService.getExaminations().onSnapshot(function(querySnapshot) {
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

  async getFills() {
    let promise = new Promise((resolve, reject) => {
      let fills = [];
      // tslint:disable-next-line: only-arrow-functions
      this.fillService.getFills().onSnapshot(function(querySnapshot) {
        fills = [];
        let i = 0;
        // tslint:disable-next-line: only-arrow-functions
        querySnapshot.forEach(function(doc) {
          fills.push(doc.data());
          fills[i].fillID = doc.id
          i++
        });
        resolve(fills)
      });
    });
    this.fills = await promise as Fill[];
  }
  async createObject() {
    let exaFills = [];
    let allFills = [];
    let i = 0;
    this.examinations.forEach(element => {
      // tslint:disable-next-line: triple-equals
      if (element.diagnostics != 'none') {
        exaFills = [];
        this.fills.forEach(fill => {
          if (element.examinationID === fill.examinationID) {
            exaFills.push(fill);
          }
        });
        const exa = {
          diagnostics: element.diagnostics,
          diagnosisDate: element.diagnosisDate,
          fills: exaFills
        };
        allFills.push(exa);
      }
    });
    this.allFills = allFills;
    this.createStats();
  }

  filterFills() {
    let j = 0;
    let fills = [];
    this.fills.forEach(fill => {
      if (fill.practitionerID === this.auth.loggedUser.practitonerID) {
        fills.push(fill);
      } else {
        j++;
      }
    })
    this.fills = fills;
    this.createObject();
  }

  createStats() {
    let correctDiagnoses = [];
    let uncorrectDiagnoses = [];
    let q = 0;
    this.allFills.forEach(fill => {
      fill.fills.forEach(element => {
        if (fill.diagnostics === element.diagnose) {
          q = 0;
          correctDiagnoses.forEach(diagnose => {
            if (diagnose.diagnose === element.diagnose) {
              q++;
            }
          });
          // tslint:disable-next-line: triple-equals
          if (q === 0 && element.diagnose != 'none') {
            const stat = {
              diagnose: element.diagnose,
              numberOf: 0
            };
            correctDiagnoses.push(stat);
          }
        } else {
          q = 0;
          uncorrectDiagnoses.forEach(diagnose => {
            if (diagnose.diagnose === element.diagnose) {
              q++;
            }
          });
          // tslint:disable-next-line: triple-equals
          if (q === 0 && element.diagnose != 'none') {
            const stat = {
              diagnose: element.diagnose,
              numberOf: 0
            };
            uncorrectDiagnoses.push(stat);
          }
        }
      });
    });
    q = 0;
    this.allFills.forEach(fill => {
      fill.fills.forEach(element => {
        correctDiagnoses.forEach(diagnose => {
          if (element.diagnose === diagnose.diagnose) {
            diagnose.numberOf++;
          }
        });
        uncorrectDiagnoses.forEach(diagnose => {
          if (element.diagnose === diagnose.diagnose) {
            diagnose.numberOf++;
          }
        });
      });
    });
    this.correctDiagnoses = correctDiagnoses.sort((a, b) => (a.numberOf > b.numberOf) ? 1 : ((b.numberOf > a.numberOf) ? -1 : 0));
    this.uncorrectDiagnoses = uncorrectDiagnoses.sort((a, b) => (a.numberOf > b.numberOf) ? 1 : ((b.numberOf > a.numberOf) ? -1 : 0));
    this.updatePiechart();
  }

  updatePiechart() {
    if (this.correctDiagnoses.length > 4) {
      for (let i = 0; i < 4; i++) {
        this.pieChartLabels[i] = this.correctDiagnoses[i].diagnose;
        this.pieChartData[i] = this.correctDiagnoses[i].numberOf;
      }
    } else {
      for (let i = 0; i < this.correctDiagnoses.length; i++) {
        this.pieChartLabels[i] = this.correctDiagnoses[i].diagnose;
        this.pieChartData[i] = this.correctDiagnoses[i].numberOf;
      }
    }
    if (this.uncorrectDiagnoses.length > 4) {
      for (let i = 0; i < 4; i++) {
        this.uncorrectPieChartLabels[i] = this.uncorrectDiagnoses[i].diagnose;
        this.uncorrectPieChartData[i] = this.uncorrectDiagnoses[i].numberOf;
      }
    } else {
      for (let i = 0; i < this.uncorrectDiagnoses.length; i++) {
        this.uncorrectPieChartLabels[i] = this.uncorrectDiagnoses[i].diagnose;
        this.uncorrectPieChartData[i] = this.uncorrectDiagnoses[i].numberOf;
      }
    }
    if (this.pieChartLabels.length > 0) {
      this.drawCorrectChart = true;
    }
    if (this.uncorrectPieChartLabels.length > 0) {
      this.drawUncorrectChart = true;
    }
  }

  async ngOnInit() {
    await this.getExaminations();
    await this.getFills();
    this.filterFills();
  }

}
