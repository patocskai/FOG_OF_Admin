import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsDialogPage } from './news-dialog.page';

describe('NewsDialogPage', () => {
  let component: NewsDialogPage;
  let fixture: ComponentFixture<NewsDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
