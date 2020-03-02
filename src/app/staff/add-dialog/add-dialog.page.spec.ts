import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDialogPage } from './add-dialog.page';

describe('AddDialogPage', () => {
  let component: AddDialogPage;
  let fixture: ComponentFixture<AddDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
