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
  dermatoscopeExperience = '';
  loaded = Promise.resolve(false);
  constructor(private auth: AuthService, private workgroupService: WorkgroupService, private practitionerService: PractitionerService) { }

  updateDermatoscopeExperience(value: any) {
    this.dermatoscopeExperience = value;
    this.practitionerService.updateDermatoscopeExperience(value, this.user.practitonerID);
  }

  async ngOnInit() {
    await this.auth.getUser();
    await this.workgroupService.getWorkgroups();
    this.workgroups = this.workgroupService.workgroups;
    this.user = this.auth.loggedUser;
    this.userName = this.auth.lgUserName;
    this.dermatoscopeExperience = this.user.dermatoscopeExperience;
    this.workgroups.forEach(workgroup => {
      if (workgroup.id === this.user.workgroup) {
        this.userWorkgroup = workgroup.name;
      }
    });
    this.loaded = Promise.resolve(true);
  }

}
