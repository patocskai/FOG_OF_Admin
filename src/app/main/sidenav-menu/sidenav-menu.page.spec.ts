import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SidenavMenuPage } from './sidenav-menu.page';

describe('SidenavMenuPage', () => {
  let component: SidenavMenuPage;
  let fixture: ComponentFixture<SidenavMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
