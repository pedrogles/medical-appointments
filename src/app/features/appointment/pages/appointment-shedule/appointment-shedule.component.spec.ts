import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentSheduleComponent } from './appointment-shedule.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'medical-appointment-shedule-form',
  standalone: true,
  template: ''
})
class AppointmentSheduleFormStubComponent {}

describe('AppointmentSheduleComponent', () => {
  let component: AppointmentSheduleComponent;
  let fixture: ComponentFixture<AppointmentSheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSheduleComponent]
    })
    // 🔥 AQUI ESTÁ O SEGREDO
    .overrideComponent(AppointmentSheduleComponent, {
      set: {
        imports: [AppointmentSheduleFormStubComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render appointment schedule form component', () => {
    const form = fixture.debugElement.query(
      By.css('medical-appointment-shedule-form')
    );

    expect(form).toBeTruthy();
  });
});