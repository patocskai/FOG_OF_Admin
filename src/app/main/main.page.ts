import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  loadSite = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examinationService: ExaminationService,
    private auth: AuthService,
    private firestore: AngularFirestore) { }

  async ngOnInit() {
  }


  loadChild(siteName: any) {
    this.router.navigateByUrl('/' + siteName);
  }
}
