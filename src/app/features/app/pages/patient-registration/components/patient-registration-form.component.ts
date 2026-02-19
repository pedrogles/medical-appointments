import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { cpfMismatchValidator } from '../../../../../core/validators/cpf-mismatch.validator';
import { REGEX } from '../../../../../core/constants/regex.constant';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective } from 'ngx-mask';
import { SEX_OPTIONS } from '../../../../../core/constants/sex-options.constant';
import { CreatePatientDTO } from '../dtos/create-patient.dto';

@Component({
  selector: 'medical-patient-registration-form',
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
  templateUrl: './patient-registration-form.component.html',
  styleUrl: './patient-registration-form.component.scss'
})
export class PatientRegistrationFormComponent implements OnInit {
  patientForm!: FormGroup;
  isLoading = true;
  readonly sexOptions = SEX_OPTIONS;
  
  private readonly formBuilder = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  ngOnInit(): void {
    this.initializeForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  initializeForm(): void {
    this.patientForm = this.formBuilder.group({
      personalData: this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        birth: ['', [Validators.required, Validators.maxLength(10)]],
        cpf: ['', [Validators.required, cpfMismatchValidator]],
        rg: ['', [Validators.required, Validators.pattern(REGEX.rg)]],
        sex: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.minLength(11)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      address: this.formBuilder.group({
        number: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(REGEX.zipCode)]],
        street: [{ value: '', disabled: true }, [Validators.required]],
        district: [{ value: '', disabled: true }, [Validators.required]],
        city: [{ value: '', disabled: true }, [Validators.required]],
        state: [{ value: '', disabled: true }, [Validators.required]]
      })
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const patientData: CreatePatientDTO = this.buildCreatePatientDTO();
    setTimeout(() => {
      this.toast.show(`Paciente "${patientData.name}" cadastrado(a) com sucesso!`, 'success');
      this.isLoading = false;
      this.patientForm.reset();
    }, 2000); 
  }

  private buildCreatePatientDTO(): CreatePatientDTO {
    const formValue = this.patientForm.getRawValue();
    return {
      name: formValue.personalData.name,
      birth: formValue.personalData.birth,
      cpf: formValue.personalData.cpf,
      rg: formValue.personalData.rg,
      sex: formValue.personalData.sex,
      phone: formValue.personalData.phone,
      email: formValue.personalData.email,
      address: {
        street: formValue.address.street,
        number: formValue.address.number,
        district: formValue.address.district,
        city: formValue.address.city,
        state: formValue.address.state,
        zip_code: formValue.address.zipCode,
      }
    };
  }

  onZipCodeChange(zipCode: Event): void {

  }

  get personalDataGroup(): FormGroup {
      return this.patientForm.get('personalData') as FormGroup;
  }

  get addressGroup(): FormGroup {
    return this.patientForm.get('address') as FormGroup;
  }
}
