import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRegistrationComponent } from './patient-registration.component';
import { By } from '@angular/platform-browser';

// Stub do componente filho
@Component({
  selector: 'medical-patient-registration-form',
  standalone: true,
  template: ''
})
class PatientRegistrationFormStubComponent {}

@Component({
  selector: 'medical-page-header',
  standalone: true,
  template: ''
})
class PageHeaderStubComponent {}

describe('PatientRegistrationComponent', () => {
  let component: PatientRegistrationComponent;
  let fixture: ComponentFixture<PatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRegistrationComponent]
    })
    .overrideComponent(PatientRegistrationComponent, {
      set: {
        imports: [
          PageHeaderStubComponent,
          PatientRegistrationFormStubComponent
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // =========================
  // RENDER CHILD
  // =========================
  it('should render patient registration form component', () => {
    const form = fixture.debugElement.query(
      By.css('medical-patient-registration-form')
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