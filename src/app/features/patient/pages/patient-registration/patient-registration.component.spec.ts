import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRegistrationComponent } from './patient-registration.component';
import { By } from '@angular/platform-browser';

// 🔥 Stub do componente filho
@Component({
  selector: 'medical-patient-registration-form',
  standalone: true,
  template: ''
})
class PatientRegistrationFormStubComponent {}

describe('PatientRegistrationComponent', () => {
  let component: PatientRegistrationComponent;
  let fixture: ComponentFixture<PatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRegistrationComponent]
    })
    // 🔥 sobrescreve imports do componente
    .overrideComponent(PatientRegistrationComponent, {
      set: {
        imports: [PatientRegistrationFormStubComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // =========================
  // BASICS
  // =========================
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
});