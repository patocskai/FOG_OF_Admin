import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupStatisticsPage } from './group-statistics.page';

describe('GroupStatisticsPage', () => {
  let component: GroupStatisticsPage;
  let fixture: ComponentFixture<GroupStatisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupStatisticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupStatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
