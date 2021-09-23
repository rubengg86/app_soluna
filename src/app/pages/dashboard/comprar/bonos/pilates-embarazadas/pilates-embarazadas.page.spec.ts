import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PilatesEmbarazadasPage } from './pilates-embarazadas.page';

describe('PilatesEmbarazadasPage', () => {
  let component: PilatesEmbarazadasPage;
  let fixture: ComponentFixture<PilatesEmbarazadasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PilatesEmbarazadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PilatesEmbarazadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
