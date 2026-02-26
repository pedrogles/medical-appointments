import { Component } from '@angular/core';
import { AppointmentSheduleFormComponent } from './forms/appointment-form/appointment-shedule-form.component';

@Component({
  selector: 'medical-appointment-shedule',
  standalone: true,
  imports: [  
    AppointmentSheduleFormComponent
  ],
  templateUrl: './appointment-shedule.component.html'
})
export class AppointmentSheduleComponent {

}
