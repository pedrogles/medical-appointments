import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../layout/app-layout/app-layout.component';
import { ProfessionalRegistrationFormComponent } from './components/professional-registration-form/professional-registration-form.component';

@Component({
  selector: 'medical-professional-registration',
  standalone: true,
  imports: [
    AppLayoutComponent, 
    ProfessionalRegistrationFormComponent
  ],
  templateUrl: './professional-registration.component.html'
})
export class ProfessionalRegistrationComponent {

}
