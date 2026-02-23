import { Component } from '@angular/core';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppLayoutComponent } from '../../../../core/layout/app-layout/app-layout.component';

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
