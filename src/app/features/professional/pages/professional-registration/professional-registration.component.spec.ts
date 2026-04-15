import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalRegistrationComponent } from './professional-registration.component';
import { By } from '@angular/platform-browser';

// Stub do componente filho
@Component({
  selector: 'medical-professional-registration-form',
  standalone: true,
  template: ''
})
class ProfessionalRegistrationFormStubComponent {}

@Component({
  selector: 'medical-page-header',
  standalone: true,
  template: ''
})
class PageHeaderStubComponent {}

describe('ProfessionalRegistrationComponent', () => {
  let component: ProfessionalRegistrationComponent;
  let fixture: ComponentFixture<ProfessionalRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalRegistrationComponent]
    })
    .overrideComponent(ProfessionalRegistrationComponent, {
      set: {
        imports: [
          PageHeaderStubComponent,
          ProfessionalRegistrationFormStubComponent
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // =========================
  // RENDER CHILD
  // =========================
  it('should render professional registration form component', () => {
    const form = fixture.debugElement.query(
      By.css('medical-professional-registration-form')
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