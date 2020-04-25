import { DatePipe } from '@angular/common';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ModalController,
  LoadingController,
  NavController,
  AlertController,
} from '@ionic/angular';
import { GroupModalPage } from './group-modal/group-modal.page';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.page.html',
  styleUrls: ['./work-group.page.scss'],
})
export class WorkGroupPage implements OnInit {
  listWorkGroups = true;
  createWorkGroup = false;

  workGroups: Workgroup[];

  // users = [];
  //  @ViewChild('selectComponent', { static: false })
  // selectComponent: IonicSelectableComponent;
  // toggle = true;
  private workGroup: FormGroup;
  date = new Date();

  constructor(
    private modalController: ModalController,
    private workGroupService: WorkgroupService,
    // private practitionerService: PractitionerService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    // private nav: NavController,
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
    // this.practitionerService.getAllPrac().subscribe((res) => {
    //   res.forEach((user) => {
    //     this.users.push({
    //       id: user.id,
    //       name: user.prefix + ' ' + user.family + ' ' + user.given,
    //     });
    //   });
    // });
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

  // clear() {
  //   this.selectComponent.clear();
  //   this.selectComponent.close();
  // }

  // toggleItems() {
  //   this.selectComponent.toggleItems(this.toggle);
  //   this.toggle = !this.toggle;
  // }

  // confirm() {
  //   this.selectComponent.confirm();
  //   this.selectComponent.close();
  // }

  async saveWorkGroup() {
    const loading = await this.loadingController.create({
      message: 'Munkacsoport mentése folyamatban..',
    });
    await loading.present();

    // this.workGroup.controls.leader.setValue(
    //   this.workGroup.controls.leader.value.id
    // );
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
