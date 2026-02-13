import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../layout/app-layout/app-layout.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';

@Component({
  selector: 'medical-appointment',
  standalone: true,
  imports: [
    AppLayoutComponent, 
    AppointmentFormComponent
  ],
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent {

}
