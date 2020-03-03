import { Component, OnInit, Input, Inject, NgModule, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';
import { PassDataService } from 'src/app/services/pass-data.service';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})

@NgModule({
  imports: [MatDialogModule]
})
export class DataPage implements OnInit {
  dataForm: FormGroup;
  data: Practitioner;
  @Output() public closePersonDetails = new EventEmitter<any>();
  constructor(private _fb: FormBuilder, private dataService: PassDataService) {
  }

  closeDetails() {
    this.dataService.selectedStaffDetails = '';
    this.closePersonDetails.emit(false);
  }

  ngOnInit() {
    this.data = this.dataService.selectedStaffDetails as Practitioner;
  }

}
