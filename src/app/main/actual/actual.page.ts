import { PractitionerService } from 'src/app/services/practitioner.service';
import { WorkgroupService } from './../../services/workgroup.service';
import { PassDataService } from './../../services/pass-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.page.html',
  styleUrls: ['./actual.page.scss'],
})
export class ActualPage implements OnInit {
  actualWorkGroupName;
  actualWorkGroupId;

  edit = false;
  @ViewChild('selectComponent', { static: false })
  selectComponent: IonicSelectableComponent;
  toggle = true;
  users = [];
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
    private workGroupService: WorkgroupService,
    private practitionerService: PractitionerService
  ) {}

  ngOnInit() {
    this.actualWorkGroupId = this.dataService.getId();
    this.actualWorkGroupName = this.dataService.getWorkGroup(
      this.actualWorkGroupId
    );
    this.workGroupService
      .getWorkGroup(this.actualWorkGroupId)
      .subscribe((res) => {
        this.workgroup.creationDate = res.creationDate;
        this.workgroup.name = res.name;
        this.workgroup.institution = res.institution;
        this.workgroup.leader = res.leader;
        this.workgroup.members = res.members;
        this.workgroup.type = res.type;
      });
    this.practitionerService.getAllPrac().subscribe((res) => {
      res.forEach((user) => {
        if (user.workgroup === '') {
          this.users.push({
            id: user.id,
            name: user.prefix + ' ' + user.family + ' ' + user.given,
          });
        }
      });
    });
  }

  updateWorkGroup() {
    // this.users.forEach((user) => {
    //   if (this.workgroup.leader === user) {
    //     this.workgroup.leader = user.id;
    //   }
    //   if (this.workgroup.members === user) {
    //     this.workgroup.members = user.id;
    //   }
    // });
    console.log(this.workgroup.leader);
    this.workGroupService.updateWorkGroup(this.workgroup, this.actualWorkGroupId).then(() => {
       console.log('update');
       console.log(this.actualWorkGroupId);
       console.log(this.workgroup);
       this.edit = false;
    });
  }
  backList() {
    this.dataService.clearMessages();
    this.router.navigateByUrl('/menu/work-group');
  }

  editMode() {
    this.edit = true;
  }

  clear() {
    this.selectComponent.clear();
    this.selectComponent.close();
  }

  toggleItems() {
    this.selectComponent.toggleItems(this.toggle);
    this.toggle = !this.toggle;
  }

  confirm() {
    this.selectComponent.confirm();
    this.selectComponent.close();
  }

  dismiss() {
    this.edit = false;
    this.ngOnInit();
  }
}
