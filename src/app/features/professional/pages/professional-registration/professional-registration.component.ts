import { Component } from '@angular/core';
import { ProfessionalRegistrationFormComponent } from './forms/professional-registration-form/professional-registration-form.component';


@Component({
  selector: 'medical-professional-registration',
  standalone: true,
  imports: [ 
    ProfessionalRegistrationFormComponent
  ],
  templateUrl: './professional-registration.component.html'
})
export class ProfessionalRegistrationComponent {

}
