import { Component } from '@angular/core';
import { AppointmentSheduleFormComponent } from './forms/appointment-form/appointment-shedule-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'medical-appointment-shedule',
  standalone: true,
  imports: [  
    AppointmentSheduleFormComponent,
    PageHeaderComponent
  ],
  templateUrl: './appointment-shedule.component.html',
  styleUrl: './appointment-shedule.component.scss'
})
export class AppointmentSheduleComponent {

}
