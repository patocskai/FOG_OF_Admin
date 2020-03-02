import { Component, OnInit, IterableDiffers } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { AuthService } from 'src/app/services/auth.service';
import { Examination } from 'src/app/interfaces/examination.interface';
import { Fill } from 'src/app/interfaces/fill.interface';
import { FillService } from 'src/app/services/fill.service';
import { DatePipe } from '@angular/common';

export interface StatExa {
  diagnostics: string;
  diagnosisDate: string;
  fills: any[];
}

@Component({
  selector: 'app-analyzes',
  templateUrl: './analyzes.page.html',
  styleUrls: ['./analyzes.page.scss'],
})
export class AnalyzesPage implements OnInit {
  public barChartOptions: any = {
    title: {
      text: 'DIAGNÓZISOK HELYESSÉGE',
      display: true
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartLabels: string[] = ['1. hét', '2. hét', '3. hét', '4. hét', '5. hét', '6. hét', '7. hét'];
  public barChartType = 'bar';
  public barChartLegend = true;
  examinations: Examination[] = [];
  fills: Fill[] = [];
  allFills = [];
  drawCharts = false;
  private differ: IterableDiffers;
  correctDiagnoses = [];
  uncorrectDiagnoses = [];
  drawCorrectChart = false;
  drawUncorrectChart = false;

  public barChartData: any[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Helytelen' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Helyes' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Nincs diagnózis' }
  ];

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';
  correctPieChartOption = {
    title: {
      text: 'HELYESEN LEADOTT DIAGNÓZISOK MEGOSZLÁSA',
      display: true
    },
    responsive: true,
    maintainAspectRatio: false
  };

  public uncorrectPieChartLabels: string[] = [];
  public uncorrectPieChartData: number[] = [];
  uncorrectPieChartOption = {
    title: {
      text: 'HELYTELENÜL LEADOTT DIAGNÓZISOK MEGOSZLÁSA',
      display: true
    },
    responsive: true,
    maintainAspectRatio: false
  };

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  constructor(
    private examinationService: ExaminationService,
    private auth: AuthService,
    private fillService: FillService,
    private differs: IterableDiffers,
    public datepipe: DatePipe) {
    this.differ = differs;
  }

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

  createStats() {
    const date = new Date();
    const converted = this.datepipe.transform(date, 'yyyy-MM-dd');
    let dateRanges = [];
    for (let i = 0; i < 7; i++) {
      date.setDate(date.getDate() - 7);
      // tslint:disable-next-line: prefer-const
      var sundayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
      // tslint:disable-next-line: prefer-const
      var mondayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
      const dateRange = {
        monday: this.datepipe.transform(mondayOfWeek, 'yyyy-MM-dd'),
        sunday: this.datepipe.transform(sundayOfWeek, 'yyyy-MM-dd')
      }
      dateRanges.push(dateRange);
    }
    let i = 6;
    let j = 1;
    dateRanges.forEach(dateRange => {
      this.allFills.forEach(fill => {
        // tslint:disable-next-line: max-line-length
        if (new Date(fill.diagnosisDate).getTime() >= new Date(dateRange.monday).getTime() && new Date(fill.diagnosisDate).getTime() <= new Date(dateRange.sunday).getTime()) {
          fill.fills.forEach(element => {
            if (element.diagnose === 'none') {
              this.barChartData[2].data[i]++;
            } else if (element.diagnose === fill.diagnostics) {
              this.barChartData[1].data[i]++;
            } else {
              this.barChartData[0].data[i]++;

            }
          });
        }
      });
      i--;
      j++;
    });
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
    this.drawCharts = true;
    if (this.pieChartLabels.length > 0) {
      this.drawCorrectChart = true;
    }
    if (this.uncorrectPieChartLabels.length > 0) {
      this.drawUncorrectChart = true;
    }
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
          fills[i].fillID = doc.id;
          i++;
        });
        resolve(fills);
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


  async ngOnInit() {
    this.examinations = [];
    await this.auth.getUser();
    await this.getExaminations();
    await this.getFills();
    this.createObject();
  }
}
