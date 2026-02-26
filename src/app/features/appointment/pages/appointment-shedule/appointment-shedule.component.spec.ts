import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSheduleComponent } from './appointment-shedule.component';

describe('AppointmentSheduleComponent', () => {
  let component: AppointmentSheduleComponent;
  let fixture: ComponentFixture<AppointmentSheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
