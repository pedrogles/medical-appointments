import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { cpfValidator } from '../../../../shared/validators/cpf.validator';
import { NgxMaskDirective } from 'ngx-mask';
import { ZipCodeService } from '../../../../core/services/zip-code/zip-code.service';
import { PatientsService } from '../../../../core/services/patients/patients.service';
import { IPatient } from '../../../../core/interfaces/patient.interface';
import { DashboardService } from '../../../dashboard/service/dashboard.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-patient-form',
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
    NgxMaskDirective,
    SpinnerComponent
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss'
})
export class PatientFormComponent implements OnInit{
  private rgRegex: RegExp = /^\d{6,9}[0-9Xx]$/;
  private zipCodeRegex: RegExp = /^\d{8}$/;
  isLoading = false;

  sexOptions = [
    { id: 0, name: 'Masculino', value: 'M' },
    { id: 1, name: 'Feminino', value: 'F' }
  ]

  private readonly formBuilder = inject(FormBuilder);
  private readonly zipCodeService = inject(ZipCodeService);
  private readonly patientsService = inject(PatientsService);
  private readonly dashboardService = inject(DashboardService);

  patientForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.patientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      birth: ['', [Validators.required, Validators.maxLength(10)]],
      cpf: ['', [Validators.required, cpfValidator]],
      rg: ['', [Validators.required, Validators.pattern(this.rgRegex)]],
      sex: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        number: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(this.zipCodeRegex)]],
        street: [{ value: '', disabled: true }, [Validators.required]],
        district: [{ value: '', disabled: true }, [Validators.required]],
        city: [{ value: '', disabled: true }, [Validators.required]],
        state: [{ value: '', disabled: true }, [Validators.required]]
      })
    });
  }

  onSubmit(): void {
    const patient = this.patientForm.getRawValue() as IPatient;
    if(this.patientForm.valid) {
      this.isLoading = true;
      this.patientsService.create(patient).subscribe({
        next: () => {
          this.dashboardService.refreshFetchedFlags();
          this.patientForm.reset()
          this.isLoading = false;
        },
        error: (error) => console.error("Erro ao criar paciente: ", error)
      });
    }    
  }

  onZipCodeChange(zipCode: Event): void {
    const input = zipCode.target as HTMLInputElement;
    const regexTest = this.zipCodeRegex.test(input.value);
    if(regexTest) {
      this.zipCodeService.getZipCodeData(Number(input.value)).subscribe({
        next: ((data) => {
          console.log(data)
          this.patientForm.get('address')?.patchValue({
            street: data.logradouro,
            city: data.localidade,
            district: data.bairro,
            state: data.estado,
            number: '',
            zipCode: input.value
          })
        }),
        error: (error) => console.error("Falha na requisição: ", error)
      })
    }
  }

  get formControls(): FormGroup['controls'] {
    return this.patientForm.controls;
  }

  get addressGroup(): FormGroup {
    return this.patientForm.get('address') as FormGroup;
  }
}
