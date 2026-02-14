import { Component, inject, OnInit } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastService } from '../../../../../../core/services/toast/toast.service';
import { CreateAppointmentDTO } from '../../dtos/create-appointment.dto';

@Component({
  selector: 'medical-appointment-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule, 
    MatButtonModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxMaskDirective
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup<{
    patientId: FormControl<string>;
    professionalId: FormControl<string>;
    date: FormControl<string>;
    hour: FormControl<string>;
    notes: FormControl<string>;
  }>;
  isLoading = true;
  readonly appointmentTimeOptions = [ 
    { label: '08:00', value: '08:00' }, 
    { label: '09:00', value: '09:00' }, 
    { label: '10:00', value: '10:00' }, 
    { label: '11:00', value: '11:00' }, 
    { label: '13:00', value: '13:00' }, 
    { label: '14:00', value: '14:00' }, 
    { label: '15:00', value: '15:00' }, 
    { label: '16:00', value: '16:00' }, 
    { label: '17:00', value: '17:00' }, 
    { label: '18:00', value: '18:00' }, 
    { label: '19:00', value: '19:00' }, 
    { label: '20:00', value: '20:00' }
  ];
    
  private readonly formBuilder = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  ngOnInit(): void {
    this.initializeForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  initializeForm(): void {
    this.appointmentForm = this.formBuilder.nonNullable.group({
      patientId: ['', [Validators.required]],
      professionalId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      notes: ['', [Validators.maxLength(500)]]
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    // const appointmentData: CreateAppointmentDTO = this.buildCreateAppointmentDTO();
    setTimeout(() => {
      this.toast.show(`Consulta agendada com sucesso!`, 'success');
      this.isLoading = false;
      this.appointmentForm.reset();
    }, 2000); 
  }

  // private buildCreateAppointmentDTO(): CreateAppointmentDTO {
  //   const formValue = this.appointmentForm.getRawValue();
  //   return {
  //     patientId: formValue.patientId,
  //     professionalId: formValue.professionalId,
  //     startDateTime: this.startDateTime(formValue.date, formValue.hour),
  //     notes: formValue.notes
  //   };
  // }

  // private startDateTime(date: string, hour: string): string {
  //   const isoString = `${date}T${hour}:00`;
  //   const parsed = new Date(isoString);

  //   if (isNaN(parsed.getTime())) {
  //     this.toast.show(`Data final inválida`, 'error');
  //     throw new Error('Data final inválida');
  //   }

  //   return parsed.toISOString();
  // }

  get formControls(): typeof this.appointmentForm.controls {
      return this.appointmentForm.controls;
  }
}
