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

@Component({
  selector: 'medical-page-header',
  standalone: true,
  template: ''
})
class PageHeaderStubComponent {}

describe('AppointmentSheduleComponent', () => {
  let component: AppointmentSheduleComponent;
  let fixture: ComponentFixture<AppointmentSheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSheduleComponent]
    })
    .overrideComponent(AppointmentSheduleComponent, {
      set: {
        imports: [
          PageHeaderStubComponent,
          AppointmentSheduleFormStubComponent
        ]
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

  it('should render page header component', () => {
    const header = fixture.debugElement.query(
      By.css('medical-page-header')
    );

    expect(header).toBeTruthy();
  });
});