import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';
import { SEX_OPTIONS } from '../../../../../../core/constants/sex-options.constant';
import { PROFESSIONAL_REGISTRATION_OPTIONS } from '../../../../../../core/constants/professional-registration-options.constant';
import { ToastService } from '../../../../../../core/services/toast/toast.service';
import { cpfMismatchValidator } from '../../../../../../core/validators/cpf-mismatch.validator';
import { REGEX } from '../../../../../../core/constants/regex.constant';
import { CreateProfessionalDTO } from '../../../../dtos/create-professional.dto';


@Component({
  selector: 'medical-professional-registration-form',
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
  templateUrl: './professional-registration-form.component.html',
  styleUrl: './professional-registration-form.component.scss'
})
export class ProfessionalRegistrationFormComponent implements OnInit {
  professionalForm!: FormGroup;
  isLoading = true;
  readonly sexOptions = SEX_OPTIONS;
  readonly professionalRegistrationOptions = PROFESSIONAL_REGISTRATION_OPTIONS;
  
  private readonly formBuilder = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  ngOnInit(): void {
    this.initializeForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  initializeForm(): void {
      this.professionalForm = this.formBuilder.group({
        personalData: this.formBuilder.group({
          name: ['', [Validators.required, Validators.minLength(6)]],
          birth: ['', [Validators.required, Validators.maxLength(10)]],
          cpf: ['', [Validators.required, cpfMismatchValidator]],
          rg: ['', [Validators.required, Validators.pattern(REGEX.rg)]],
          sex: ['', [Validators.required]],
          phone: ['', [Validators.required, Validators.minLength(11)]],
          email: ['', [Validators.required, Validators.email]],
        }),
        professionalData: this.formBuilder.group({
          specialty: ['', [Validators.required, Validators.minLength(2)]],
          registrationType: ['', [Validators.required]],
          registrationJurisdiction: ['', [Validators.required, Validators.minLength(2)]],
          registrationNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
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
      const professionalData: CreateProfessionalDTO = this.buildCreateProfessionalDTO();
      setTimeout(() => {
        this.toast.show(`Profissional "${professionalData.name}" cadastrado(a) com sucesso!`, 'success');
        this.isLoading = false;
        this.professionalForm.reset();
      }, 2000); 
    }

    private buildCreateProfessionalDTO(): CreateProfessionalDTO {
      const formValue = this.professionalForm.getRawValue();
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
        },
        specialty: formValue.professionalData.specialty,
        registration_type:  formValue.professionalData.registrationType,
        registration_number: formValue.professionalData.registrationNumber,
        registration_jurisdiction: formValue.professionalData.registrationJurisdiction
      }
    }
  
    onZipCodeChange(zipCode: Event): void {
  
    }
  
    get personalDataGroup(): FormGroup {
      return this.professionalForm.get('personalData') as FormGroup;
    }
    
    get professionalDataGroup(): FormGroup {
      return this.professionalForm.get('professionalData') as FormGroup;
    }

    get addressGroup(): FormGroup {
      return this.professionalForm.get('address') as FormGroup;
    }
}
