import { Component, inject } from '@angular/core';
import { AppointmentReview } from '../../../../../../../core/types/appointment.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
 import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'medical-appointment-review',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDividerModule
  ],
  templateUrl: './appointment-review.component.html',
  styleUrl: './appointment-review.component.scss'
})
export class AppointmentReviewComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentReviewComponent>);
  readonly appointmentReviewData = inject<AppointmentReview>(MAT_DIALOG_DATA);

  confirm(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
