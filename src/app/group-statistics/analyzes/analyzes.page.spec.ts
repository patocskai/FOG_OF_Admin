import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalyzesPage } from './analyzes.page';

describe('AnalyzesPage', () => {
  let component: AnalyzesPage;
  let fixture: ComponentFixture<AnalyzesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyzesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
