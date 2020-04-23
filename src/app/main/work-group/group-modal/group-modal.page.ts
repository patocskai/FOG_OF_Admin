import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';
import { WorkgroupService } from './../../../services/workgroup.service';
import {
  ModalController,
  NavParams,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.page.html',
  styleUrls: ['./group-modal.page.scss'],
})
export class GroupModalPage implements OnInit {
  @Input() id: number;

  workgroup: Workgroup = {
    id: '',
    creationDate: '',
    name: '',
    institution: '',
    leader: '',
    members: [],
    type: '',
  };
  constructor(
    private modalController: ModalController,
    private workGroupService: WorkgroupService,
    private loadingController: LoadingController,
    private router: Router,
    public alertController: AlertController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadWorkGroup();
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
