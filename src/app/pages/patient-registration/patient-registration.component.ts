import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [PageLayoutComponent, PatientFormComponent],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss'
})
export class PatientRegistrationComponent {

}
