import { Component } from '@angular/core';
import { PatientRegistrationFormComponent } from './components/patient-registration-form.component';
import { AppLayoutComponent } from '../../../../core/layout/app-layout/app-layout.component';

@Component({
  selector: 'medical-patient-registration',
  standalone: true,
  imports: [
    AppLayoutComponent, 
    PatientRegistrationFormComponent
  ],
  templateUrl: './patient-registration.component.html'
})
export class PatientRegistrationComponent {

}
