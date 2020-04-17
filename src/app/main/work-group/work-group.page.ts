import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Component, OnInit } from '@angular/core';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.page.html',
  styleUrls: ['./work-group.page.scss'],
})
export class WorkGroupPage implements OnInit {
  listWorkGroups = true;
  createWorkGroup = false;

  constructor(
    private workGroupService: WorkgroupService
  ) {}

  ngOnInit() {
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
