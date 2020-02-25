import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExaminationPage } from './examination.page';

describe('ExaminationPage', () => {
  let component: ExaminationPage;
  let fixture: ComponentFixture<ExaminationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
