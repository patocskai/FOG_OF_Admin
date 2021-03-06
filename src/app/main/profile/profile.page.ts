import { PassDataService } from './../../services/pass-data.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WorkgroupService } from 'src/app/services/workgroup.service';
import { Workgroup } from 'src/app/interfaces/workgroup.interface';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  userName = '';
  workgroups: Workgroup[] = [];
  userWorkgroup;
  options = ['1', '2', '3', '3+'];
  loaded = Promise.resolve(false);

  constructor(
    private auth: AuthService,
    private workgroupService: WorkgroupService,
    private practitionerService: PractitionerService,
    private dataService: PassDataService
  ) {}

  async ngOnInit() {
    await this.auth.getUser();
    this.workgroupService.getWorkgroups();
    this.workgroups = this.workgroupService.workgroups;
    this.user = this.auth.loggedUser;
    this.userName = this.auth.lgUserName;
    this.workgroups.forEach((workgroup) => {
      if (workgroup.id === this.dataService.getId()) {
        this.userWorkgroup = workgroup.name;
      }
    });
    this.loaded = Promise.resolve(true);
    console.log(this.userWorkgroup);
    console.log(this.user.workgroup);
  }
}
