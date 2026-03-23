import { Component, input } from '@angular/core';
import { AppointmentReview } from '../../../../../../../core/types/appointment.type';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'medical-appointment-review',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './appointment-review.component.html',
  styleUrl: './appointment-review.component.scss'
})
export class AppointmentReviewComponent {
  appointmentReview = input.required<AppointmentReview>();
}
