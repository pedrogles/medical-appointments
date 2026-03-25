import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { CepService } from '../../../../../../core/services/cep/cep.service';
import { ProfessionalService } from '../../../../services/professional.service';
import { PersonalDataFormType } from '../../../../../../core/types/personalDataForm.type';
import { AddressFormType } from '../../../../../../core/types/addressForm.type';
import { ProfessionalDataFormType } from '../../../../../../core/types/professionalDataForm.type';
import { SexType } from '../../../../../../core/types/sex.type';
import { ProfessionalRegistrationType } from '../../../../../../core/types/professionalRegistration.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
  professionalForm!: FormGroup<{
    personalData: FormGroup<PersonalDataFormType>;
    professionalData: FormGroup<ProfessionalDataFormType>;
    address: FormGroup<AddressFormType>;
  }>;
  isLoading = false;
  readonly sexOptions = SEX_OPTIONS;
  readonly professionalRegistrationOptions = PROFESSIONAL_REGISTRATION_OPTIONS;
  
  private readonly formBuilder = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly cepService = inject(CepService);
  private readonly professionalService = inject(ProfessionalService);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initializeForm();
    this.listenZipCodeChanges();
  }

  private initializeForm(): void {
    this.professionalForm = this.formBuilder.nonNullable.group({
      personalData: this.formBuilder.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        birth: ['', [Validators.required, Validators.maxLength(10)]],
        cpf: ['', [Validators.required, cpfMismatchValidator]],
        rg: ['', [Validators.required, Validators.pattern(REGEX.rg)]],
        sex: this.formBuilder.nonNullable.control<SexType>(
          'male', [Validators.required]),
        phone: ['', [Validators.required, Validators.minLength(11)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      professionalData: this.formBuilder.nonNullable.group({
        specialty: ['', [Validators.required, Validators.minLength(2)]],
        registrationType: this.formBuilder.nonNullable.control<ProfessionalRegistrationType>(
          'CRM', [Validators.required]),
        registrationJurisdiction: ['', [Validators.required, Validators.minLength(2)]],
        registrationNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
      }),
      address: this.formBuilder.nonNullable.group({
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
    this.professionalService.create(professionalData).subscribe({
        next: (createdProfessional) => {
          this.toast.show(`Profissional "${createdProfessional.name}" cadastrado(a) com sucesso!`, 'success');
          this.professionalForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating professional:', error);
          this.toast.show('Erro ao cadastrar profissional. Por favor, tente novamente.', 'error');
          this.isLoading = false;
        }
    });
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
      street: formValue.address.street,
      number: formValue.address.number,
      district: formValue.address.district,
      city: formValue.address.city,
      state: formValue.address.state,
      zip_code: formValue.address.zipCode,
      specialty: formValue.professionalData.specialty,
      registration_type:  formValue.professionalData.registrationType,
      registration_number: formValue.professionalData.registrationNumber,
      registration_jurisdiction: formValue.professionalData.registrationJurisdiction
    }
  }

  private listenZipCodeChanges(): void {
    const zipCodeControl = this.addressGroup.get('zipCode');

    zipCodeControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((zipCode: string) => REGEX.zipCode.test(zipCode)),
      switchMap((zipCode: string) => this.cepService.getAddressByCep(Number(zipCode))),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.professionalForm.get('address')?.patchValue({
          street: data.logradouro,
          city: data.localidade,
          district: data.bairro,
          state: data.uf,
          number: '',
          zipCode: zipCodeControl.value
        });
      },
      error: (error) => {
        console.error('Erro ao buscar CEP:', error);
        this.toast.show(
          'Erro ao buscar endereço. Verifique o CEP.',
          'error'
        );
      }
    });
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
