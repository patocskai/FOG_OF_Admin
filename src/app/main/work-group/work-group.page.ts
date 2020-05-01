import { DatePipe } from '@angular/common';
import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Component, OnInit } from '@angular/core';
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
  date = new Date();
  radioId;

  constructor(
    private modalController: ModalController,
    private workGroupService: WorkgroupService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private datePipe: DatePipe,
    public alertController: AlertController
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
    this.workGroupService.getAllWorkGroups().subscribe((res) => {
      this.workGroups = res;
    });
  }

  chooseWorkGroup(id) {
    this.radioId = id;
    console.log(this.radioId);
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
