import { WorkgroupService } from './../../services/workgroup.service';
import { PassDataService } from './../../services/pass-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.page.html',
  styleUrls: ['./actual.page.scss'],
})
export class ActualPage implements OnInit {

  actualWorkGroupName;
  actualWorkGroupId;

  edit = false;
  workgroup: Workgroup = {
    creationDate: '',
    name: '',
    institution: '',
    leader: '',
    members: [],
    type: '',
  };

  constructor(
    private dataService: PassDataService,
    private router: Router,
    private workGroupService: WorkgroupService
  ) {  }

  ngOnInit() {
    this.actualWorkGroupId = this.dataService.getId();
    this.actualWorkGroupName = this.dataService.getWorkGroup(this.actualWorkGroupId);
    this.workGroupService.getWorkGroup(this.actualWorkGroupId).subscribe((res) => {
      this.workgroup.creationDate = res.creationDate;
      this.workgroup.name = res.name;
      this.workgroup.institution = res.institution;
      this.workgroup.leader = res.leader;
      this.workgroup.members = res.members;
      this.workgroup.type = res.type;
    });
  }

  backList() {
    this.dataService.clearMessages();
    this.router.navigateByUrl('/menu/work-group');
  }

  editMode() {
    this.edit = true;
  }
}
