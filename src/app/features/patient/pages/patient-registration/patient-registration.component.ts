import { Component } from '@angular/core';
import { PatientRegistrationFormComponent } from './forms/patient-registration-form/patient-registration-form.component';

@Component({
  selector: 'medical-patient-registration',
  standalone: true,
  imports: [ 
    PatientRegistrationFormComponent
  ],
  templateUrl: './patient-registration.component.html'
})
export class PatientRegistrationComponent {

}
