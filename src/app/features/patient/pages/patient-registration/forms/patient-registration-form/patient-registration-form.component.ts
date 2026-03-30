import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective } from 'ngx-mask';
import { SEX_OPTIONS } from '../../../../../../core/constants/sex-options.constant';
import { ToastService } from '../../../../../../core/services/toast/toast.service';
import { cpfMismatchValidator } from '../../../../../../core/validators/cpf-mismatch.validator';
import { REGEX } from '../../../../../../core/constants/regex.constant';
import { CreatePatientDTO } from '../../../../dtos/create-patient.dto';
import { SexType } from '../../../../../../core/types/sex.type';
import { PersonalDataFormType } from '../../../../../../core/types/personalDataForm.type';
import { AddressFormType } from '../../../../../../core/types/addressForm.type';
import { PatientService } from '../../../../services/patient.service';
import { CepService } from '../../../../../../core/services/cep/cep.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
  patientForm!: FormGroup<{
    personalData: FormGroup<PersonalDataFormType>;
    address: FormGroup<AddressFormType>;
  }>;
  isLoading = false;
  readonly sexOptions = SEX_OPTIONS;
 
  private readonly formBuilder = inject(FormBuilder);
  private readonly patientService = inject(PatientService);
  private readonly toast = inject(ToastService);
  private readonly cepService = inject(CepService);
  
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initializeForm();
    this.listenZipCodeChanges();
  }

  private initializeForm(): void {
    this.patientForm = this.formBuilder.group({
      personalData: this.formBuilder.group<PersonalDataFormType>({
        name: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
        birth: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.maxLength(10)] }),
        cpf: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, cpfMismatchValidator] }),
        rg: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.pattern(REGEX.rg)] }),
        sex: new FormControl<SexType>('male', 
          { nonNullable: true, validators:[Validators.required] }),
        phone: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.minLength(11)] }),
        email: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.email] }),
      }),
      address: this.formBuilder.group<AddressFormType>({
        number: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] }),
        zipCode: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.pattern(REGEX.zipCode)] }),
        street: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] }),
        district: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] }),
        city: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] }),
        state: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] })
      })
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const patientData: CreatePatientDTO = this.buildCreatePatientDTO();
    this.patientService.create(patientData).subscribe({
        next: (createdPatient) => {
          this.toast.show(`Paciente "${createdPatient.name}" cadastrado(a) com sucesso!`, 'success');
          this.patientForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating patient:', error);
          this.toast.show('Erro ao cadastrar paciente. Por favor, tente novamente.', 'error');
          this.isLoading = false;
        }
    });
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
      street: formValue.address.street,
      number: formValue.address.number,
      district: formValue.address.district,
      city: formValue.address.city,
      state: formValue.address.state,
      zip_code: formValue.address.zipCode,
    };
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
        this.patientForm.get('address')?.patchValue({
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
      return this.patientForm.get('personalData') as FormGroup;
  }

  get addressGroup(): FormGroup {
    return this.patientForm.get('address') as FormGroup;
  }
}
