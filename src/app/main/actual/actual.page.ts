import { PassDataService } from './../../services/pass-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.page.html',
  styleUrls: ['./actual.page.scss'],
})
export class ActualPage implements OnInit {

  actualWorkGroupName;
  actualWorkGroupId;

  constructor(
    private dataService: PassDataService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.actualWorkGroupId = this.dataService.getId();
    this.actualWorkGroupName = this.dataService.getWorkGroup(this.actualWorkGroupId);
  }

  backList() {
    this.dataService.clearMessages();
    this.router.navigateByUrl('/menu/work-group');
  }
}
