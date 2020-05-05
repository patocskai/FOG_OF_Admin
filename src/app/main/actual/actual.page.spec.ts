import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualPage } from './actual.page';

describe('ActualPage', () => {
  let component: ActualPage;
  let fixture: ComponentFixture<ActualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
