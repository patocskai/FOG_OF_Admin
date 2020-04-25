import { Workgroup } from './../../../interfaces/workgroup.interface';
import { PractitionerService } from './../../../services/practitioner.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { WorkgroupService } from './../../../services/workgroup.service';
import {
  ModalController,
  NavParams,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.page.html',
  styleUrls: ['./group-modal.page.scss'],
})
export class GroupModalPage implements OnInit {
  @Input() id: string;
  workgroup: Workgroup = {
    creationDate: '',
    name: '',
    institution: '',
    leader: '',
    members: [],
    type: '',
  };

  edit = false;
  @ViewChild('selectComponent', { static: false })
  selectComponent: IonicSelectableComponent;
  toggle = true;
  users = [];

  constructor(
    private modalController: ModalController,
    private workGroupService: WorkgroupService,
    private practitionerService: PractitionerService,
    private loadingController: LoadingController,
    private router: Router,
    public alertController: AlertController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadWorkGroup();
    this.practitionerService.getAllPrac().subscribe((res) => {
      res.forEach((user) => {
        if (user.workgroup === '') {
          this.users.push({
            id: user.id,
            name: user.prefix + ' ' + user.family + ' ' + user.given
          });
        }
      });
    });
  }

  async loadWorkGroup() {
    const loading = await this.loadingController.create({
      message: 'Munkacsoport betöltése..',
    });
    await loading.present();
    this.workGroupService.getWorkGroup(this.id).subscribe((res) => {
      loading.dismiss();
      this.workgroup.creationDate = res.creationDate;
      this.workgroup.name = res.name;
      this.workgroup.institution = res.institution;
      this.workgroup.leader = res.leader;
      this.workgroup.members = res.members;
      this.workgroup.type = res.type;
    });
  }

  updateWorkGroup() {
    // this.users.forEach((user) => {
    //   if (this.workgroup.leader === user) {
    //     this.workgroup.leader = user.id;
    //   }
    //   if (this.workgroup.members === user) {
    //     this.workgroup.members = user.id;
    //   }
    // });
    console.log(this.workgroup.leader);
    this.workGroupService.updateWorkGroup(this.workgroup, this.id).then(() => {
       console.log('update');
       console.log(this.id);
       console.log(this.workgroup);
       this.edit = false;
    });
  }

  editMode() {
    this.edit = true;
  }

  clear() {
    this.selectComponent.clear();
    this.selectComponent.close();
  }

  toggleItems() {
    this.selectComponent.toggleItems(this.toggle);
    this.toggle = !this.toggle;
  }

  confirm() {
    this.selectComponent.confirm();
    this.selectComponent.close();
  }

  routeWorkGroup() {
    this.router.navigateByUrl('/menu/group-statistics');
    this.modalController.dismiss();
  }

  async dismiss() {
    this.modalController.dismiss();
  }

  async removeGroup() {
    const alert = await this.alertController.create({
      message: 'Biztosan <strong>törli</strong>?',
      buttons: [
        {
          text: 'Törlés',
          cssClass: 'alertDanger',
          handler: () => {
            this.workGroupService.removeWorkGroup(this.id);
            this.dismiss();
            this.ngOnInit();
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
}
