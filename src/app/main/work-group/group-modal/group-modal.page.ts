import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.page.html',
  styleUrls: ['./group-modal.page.scss'],
})
export class GroupModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async dismiss() {
    this.modalController.dismiss();
  }
}
