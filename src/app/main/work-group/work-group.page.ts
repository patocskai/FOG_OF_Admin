import { MenuPage } from './../menu/menu.page';
import { Router, ActivatedRoute } from '@angular/router';
import { PassDataService } from 'src/app/services/pass-data.service';
import { DatePipe } from '@angular/common';
import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { GroupModalPage } from './group-modal/group-modal.page';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.page.html',
  styleUrls: ['./work-group.page.scss'],
})
export class WorkGroupPage implements OnInit {
  listWorkGroups = true;
  createWorkGroup = false;
  workGroups: Workgroup[];
  workGroup: FormGroup;
  passWorkGroup = {
    id: '',
    display: true
  };
  date = new Date();

  constructor(
    private modalController: ModalController,
    private workGroupService: WorkgroupService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private datePipe: DatePipe,
    public alertController: AlertController,
    private dataService: PassDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.workGroup = this.formBuilder.group({
      creationDate: [this.datePipe.transform(this.date, 'yyyy-MM-dd')],
      name: ['', Validators.required],
      institution: ['', Validators.required],
      leader: [''],
      members: [[]],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    if (this.route.snapshot.data['special']) {
      // tslint:disable-next-line: no-string-literal
      this.workGroup = this.route.snapshot.data['special'];
    }
    this.workGroupService.getAllWorkGroups().subscribe((res) => {
      this.workGroups = res;
    });
  }

  chooseWorkGroup(id) {
    this.dataService.sendMessage(id);
    this.passWorkGroup.id = id;
    this.dataService.setWorkGroup(id, this.passWorkGroup);
    this.router.navigate(['/menu/work-group', id]);
  }

  async information() {
    const alert = await this.alertController.create({
      header: 'Információ',
      message:
        'Válasszon a listából, a megfelelő adatok megjelenítése érdekében.',
      buttons: ['OK'],
    });

    await alert.present();
    console.log('it works');
  }

  segmentChanged(event) {
    const segment = event.target.value;

    // tslint:disable-next-line: triple-equals
    if (segment == 'listWorkGroups') {
      this.createWorkGroup = false;
      this.listWorkGroups = true;
    }
    // tslint:disable-next-line: triple-equals
    if (segment == 'createWorkGroup') {
      this.createWorkGroup = true;
      this.listWorkGroups = false;
    }
  }

  async saveWorkGroup() {
    const loading = await this.loadingController.create({
      message: 'Munkacsoport mentése folyamatban..',
    });
    await loading.present();

    this.workGroupService.addWorkGroup(this.workGroup.value).then(() => {
      loading.dismiss();
      this.workGroup.reset();
    });
  }

  async removeGroup(item) {
    const alert = await this.alertController.create({
      message: '<strong>Törli</strong> a csoportot?',
      buttons: [
        {
          text: 'Törlés',
          cssClass: 'alertDanger',
          handler: () => {
            this.workGroupService.removeWorkGroup(item.id);
          },
        },
        {
          text: 'Mégse',
          role: 'cancel',
          cssClass: 'alertDanger',
        },
      ],
    });

    await alert.present();
  }

  async openModal(id) {
    const modal = await this.modalController.create({
      component: GroupModalPage,
      componentProps: {
        id,
      },
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
    });
    return await modal.present();
  }
}
