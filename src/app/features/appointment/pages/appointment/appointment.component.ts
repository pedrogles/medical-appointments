import { Component } from '@angular/core';
import { AppointmentFormComponent } from './forms/appointment-form/appointment-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'medical-appointment',
  standalone: true,
  imports: [  
    AppointmentFormComponent,
    PageHeaderComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {

}
