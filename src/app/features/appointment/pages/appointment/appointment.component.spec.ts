import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentComponent } from './appointment.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'medical-appointment-form',
  standalone: true,
  template: ''
})
class AppointmentFormStubComponent {}

@Component({
  selector: 'medical-page-header',
  standalone: true,
  template: ''
})
class PageHeaderStubComponent {}

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentComponent]
    })
    .overrideComponent(AppointmentComponent, {
      set: {
        imports: [
          PageHeaderStubComponent,
          AppointmentFormStubComponent
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render appointment schedule form component', () => {
    const form = fixture.debugElement.query(
      By.css('medical-appointment-form')
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