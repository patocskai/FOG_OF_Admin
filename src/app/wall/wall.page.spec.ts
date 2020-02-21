import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WallPage } from './wall.page';

describe('WallPage', () => {
  let component: WallPage;
  let fixture: ComponentFixture<WallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
