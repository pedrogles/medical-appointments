import { Component } from '@angular/core';
import { PatientRegistrationFormComponent } from './forms/patient-registration-form/patient-registration-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'medical-patient-registration',
  standalone: true,
  imports: [ 
    PageHeaderComponent,
    PatientRegistrationFormComponent
  ],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss'
})
export class PatientRegistrationComponent {

}
