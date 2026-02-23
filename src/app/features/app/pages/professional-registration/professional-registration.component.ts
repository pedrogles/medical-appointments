import { Component } from '@angular/core';
import { ProfessionalRegistrationFormComponent } from './components/professional-registration-form/professional-registration-form.component';
import { AppLayoutComponent } from '../../../../core/layout/app-layout/app-layout.component';

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
