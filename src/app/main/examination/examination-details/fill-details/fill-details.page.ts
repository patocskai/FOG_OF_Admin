import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Fill } from 'src/app/interfaces/fill.interface';
import { FillService } from 'src/app/services/fill.service';

@Component({
  selector: 'app-fill-details',
  templateUrl: './fill-details.page.html',
  styleUrls: ['./fill-details.page.scss'],
})
export class FillDetailsPage implements OnInit {

  @Output() public close = new EventEmitter<Boolean>();
  @Input() person: any = {};
  textAreaOpen = false;
  fills: Fill[] = [];

  constructor(private fillService: FillService) { }

  closeTextArea() {
    this.textAreaOpen = false;
  }
  share() {
    this.textAreaOpen = true;
  }

  getSelectedPerson(person: any) {
    this.person = person;
  }
  ocFillDetails() {
    this.close.emit(false);
  }

  ngOnInit() {
  }

}
