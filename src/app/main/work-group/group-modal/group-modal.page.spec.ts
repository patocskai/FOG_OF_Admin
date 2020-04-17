import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupModalPage } from './group-modal.page';

describe('GroupModalPage', () => {
  let component: GroupModalPage;
  let fixture: ComponentFixture<GroupModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
