import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarningDialogPage } from './warning-dialog.page';

describe('WarningDialogPage', () => {
  let component: WarningDialogPage;
  let fixture: ComponentFixture<WarningDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningDialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarningDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
