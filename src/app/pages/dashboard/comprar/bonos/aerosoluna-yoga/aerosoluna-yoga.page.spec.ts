import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AerosolunaYogaPage } from './aerosoluna-yoga.page';

describe('AerosolunaYogaPage', () => {
  let component: AerosolunaYogaPage;
  let fixture: ComponentFixture<AerosolunaYogaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AerosolunaYogaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AerosolunaYogaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
