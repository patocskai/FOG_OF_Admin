import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WDialogPage } from './w-dialog.page';

describe('WDialogPage', () => {
  let component: WDialogPage;
  let fixture: ComponentFixture<WDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WDialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
