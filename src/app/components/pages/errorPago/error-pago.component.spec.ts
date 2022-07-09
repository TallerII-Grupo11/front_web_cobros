import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPagoComponent } from './error-pago.component';

describe('ErrorPagoComponent', () => {
  let component: ErrorPagoComponent;
  let fixture: ComponentFixture<ErrorPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
