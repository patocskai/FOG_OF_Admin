import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupModalPage } from './group-modal/group-modal.page';



@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.page.html',
  styleUrls: ['./work-group.page.scss'],
})
export class WorkGroupPage implements OnInit {
  listWorkGroups = true;
  createWorkGroup = false;

  constructor(
    private modalController: ModalController,
    private workGroupService: WorkgroupService
  ) {}

  ngOnInit() {
   }

   async openModal() {
    const modal = await this.modalController.create({
      component: GroupModalPage,
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

  klikk() {
    console.log();
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
}
