import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  LoadingController,
  NavController,
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

  private workGroup: FormGroup;

  constructor(
    private modalController: ModalController,
    private workGroupService: WorkgroupService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private nav: NavController
  ) {
    this.workGroup = this.formBuilder.group({
      creationDate: [new Date().getTime()],
      name: ['', Validators.required],
      institution: ['', Validators.required],
      leader: ['', Validators.required],
      members: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.workGroupService.getAllWorkGroups().subscribe((res) => {
      this.workGroups = res;
    });
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
    console.log(this.workGroup.value);
  }

  removeGroup(item) {
    this.workGroupService.removeWorkGroup(item.id);
  }

  async openModal(id) {
    const modal = await this.modalController.create({
      component: GroupModalPage,
      componentProps: {
        id,
      },
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(), // Get the top-most ion-modal
    });
    return await modal.present();
  }
}
