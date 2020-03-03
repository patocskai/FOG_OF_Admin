import { Component, OnInit } from '@angular/core';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef } from '@angular/material';
import { WDialogPage } from '../w-dialog/w-dialog.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.page.html',
  styleUrls: ['./add-dialog.page.scss'],
})
export class AddDialogPage implements OnInit {
  staff = [];
  availableUsers = [];
  change = false;
  constructor(
    private practitionerService: PractitionerService,
    private wdialog: MatDialog,
    public dialogRef: MatDialogRef<AddDialogPage>,
    private auth: AuthService) {
  }

  async getPractitioners() {
    this.staff = [];
    let docSnapshots = [];
    let i = 0;
    let promise = new Promise((resolve, reject) => {
      this.practitionerService.getStaff().get().then(data => {
        docSnapshots = data.docs;
        docSnapshots.forEach(element => {
          if (element.id !== this.auth.loggedUser.practitonerID) {
            this.staff.push(element.data());
            this.staff[i].practitonerID = element.id;
            this.staff[i].name = this.staff[i].prefix + ' ' + this.staff[i].family + ' ' + this.staff[i].given + ' ' + this.staff[i].suffix;
            i++;
          }
        });
        resolve(this.staff);
      });
    });
    this.staff = await promise as Practitioner[];
  }

  async getAvailableUsers() {
    this.availableUsers = [];
    let docSnapshots = [];
    let i = 0;
    let promise = new Promise((resolve, reject) => {
      this.practitionerService.getAvailableUsers().then(data => {
        docSnapshots = data.docs;
        docSnapshots.forEach(element => {
          this.availableUsers.push(element.data());
          this.availableUsers[i].practitonerID = element.id;
          if (this.availableUsers[i].prefix === '' && this.availableUsers[i].suffix !== '') {
            // tslint:disable-next-line: max-line-length
            this.availableUsers[i].name = this.availableUsers[i].family + ' ' + this.availableUsers[i].given + ' ' + this.availableUsers[i].suffix;
          } else if (this.availableUsers[i].suffix === '' && this.availableUsers[i].prefix !== '') {
            // tslint:disable-next-line: max-line-length
            this.availableUsers[i].name = this.availableUsers[i].prefix + ' ' + this.availableUsers[i].family + ' ' + this.availableUsers[i].given;
          } else if (this.availableUsers[i].prefix === '' && this.availableUsers[i].suffix === '') {
            this.availableUsers[i].name = this.availableUsers[i].family + ' ' + this.availableUsers[i].given;
          } else {
            // tslint:disable-next-line: max-line-length
            this.availableUsers[i].name = this.availableUsers[i].prefix + ' ' + this.availableUsers[i].family + ' ' + this.availableUsers[i].given + ' ' + this.availableUsers[i].suffix;
          }
          i++;
        });
        resolve(this.availableUsers);
      });
    });
    this.availableUsers = await promise as Practitioner[];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let dialogRef = this.wdialog.open(WDialogPage, {
        data: { event: event },
        panelClass: 'warning-dialog'
      });
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          transferArrayItem(event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex);
        } else if (result) {
          this.change = true;
          this.saveChanges(event);
        }
      });
    }
  }

  close() {
    this.dialogRef.close(this.change);
  }

  saveChanges(event: any) {
    if (event.previousContainer.id === 'staff' && event.container.id === 'availableUsers') {
      this.practitionerService.removePractitionerFromWorkgroup(event.container.data[event.currentIndex].practitonerID);
    } else if (event.previousContainer.id === 'availableUsers' && event.container.id === 'staff') {
      this.practitionerService.addPractitionerForWorkgroup(event.container.data[event.currentIndex].practitonerID);

    }
  }
  ngOnInit() {
    this.getPractitioners();
    this.getAvailableUsers();
  }

}
