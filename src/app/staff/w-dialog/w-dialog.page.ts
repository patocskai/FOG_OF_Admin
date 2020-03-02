import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-w-dialog',
  templateUrl: './w-dialog.page.html',
  styleUrls: ['./w-dialog.page.scss'],
})
export class WDialogPage implements OnInit {

  containerName = '';
  practitionerName = '';

  constructor(
    public dialogRef: MatDialogRef<WDialogPage>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges() {
    this.dialogRef.close(true);
  }

  discardChanges() {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    if (this.data.event.container.id === 'staff') {
      this.containerName = 'staff';
    } else {
      this.containerName = 'availableUsers';
    }
    this.practitionerName = this.data.event.container.data[this.data.event.currentIndex].name;
  }
}
