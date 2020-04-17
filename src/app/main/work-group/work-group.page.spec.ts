import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkGroupPage } from './work-group.page';

describe('WorkGroupPage', () => {
  let component: WorkGroupPage;
  let fixture: ComponentFixture<WorkGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
