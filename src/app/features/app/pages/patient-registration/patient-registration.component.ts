import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../layout/app-layout/app-layout.component';
import { PatientRegistrationFormComponent } from './components/patient-registration-form.component';

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
