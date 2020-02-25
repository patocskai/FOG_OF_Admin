import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.page.html',
  styleUrls: ['./warning-dialog.page.scss'],
})
export class WarningDialogPage implements OnInit {
  delete = true;
  constructor(public dialogRef: MatDialogRef<WarningDialogPage>) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
