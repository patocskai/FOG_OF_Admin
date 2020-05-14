import { PassDataService } from './../../services/pass-data.service';
import { Router, ActivatedRoute, Resolve, RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe, CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkGroupPage } from './work-group.page';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DataResolverService } from 'src/app/services/data-resolver.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IonicSelectableModule } from 'ionic-selectable';

fdescribe('WorkGroupPage', () => {
  let component: WorkGroupPage;
  let fixture: ComponentFixture<WorkGroupPage>;
  let page: WorkGroupPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkGroupPage],
      imports: [
        IonicModule.forRoot(),
         ReactiveFormsModule,
         AngularFireModule.initializeApp(environment.firebase, 'fog-of-d'),
         BrowserDynamicTestingModule,
         CommonModule,
    FormsModule,
    RouterModule,
    IonicSelectableModule
        ],
      providers: [
        AngularFirestore,
        DatePipe,
        AngularFireAuth,
        DataResolverService,
        PassDataService,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
         },
         {
          provide: ActivatedRoute,
          useValue: {
              snapshot: {
                  paramMap: {
                      get(): string {
                          return '123';
                      },
                  },
              },
          },
      },

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = fixture.componentInstance;
  }));

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('form should be invalid', async(() => {
    page.workGroup.controls.creationDate.setValue('');
    page.workGroup.controls.name.setValue('');
    page.workGroup.controls.institution.setValue('');
    page.workGroup.controls.leader.setValue('');
    page.workGroup.controls.members.setValue('');
    page.workGroup.controls.type.setValue('');
    expect(page.workGroup.valid).toBeFalsy();
  }));

  it('should open', async(() => {
    const openModalBtn = fixture.nativeElement.querySelector('#open');
    const openModalSpy = spyOn(page, 'openModal');
   // openModalBtn.click();
    expect(openModalSpy).toHaveBeenCalledTimes(1);
  }));

});
