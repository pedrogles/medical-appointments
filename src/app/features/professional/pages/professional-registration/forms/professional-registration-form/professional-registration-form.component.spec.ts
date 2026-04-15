import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
  discardPeriodicTasks
} from '@angular/core/testing';

import { ProfessionalRegistrationFormComponent } from './professional-registration-form.component';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ProfessionalService } from '../../../../services/professional.service';
import { CepService } from '../../../../../../core/services/cep/cep.service';
import { ToastService } from '../../../../../../core/services/toast/toast.service';

import { of, throwError } from 'rxjs';

describe('ProfessionalRegistrationFormComponent', () => {
  let component: ProfessionalRegistrationFormComponent;
  let fixture: ComponentFixture<ProfessionalRegistrationFormComponent>;

  let professionalServiceSpy: jasmine.SpyObj<ProfessionalService>;
  let cepServiceSpy: jasmine.SpyObj<CepService>;
  let toastSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    professionalServiceSpy = jasmine.createSpyObj('ProfessionalService', ['create']);
    cepServiceSpy = jasmine.createSpyObj('CepService', ['getAddressByCep']);
    toastSpy = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [ProfessionalRegistrationFormComponent],
      providers: [
        provideNoopAnimations(),
        provideNgxMask(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProfessionalService, useValue: professionalServiceSpy },
        { provide: CepService, useValue: cepServiceSpy },
        { provide: ToastService, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // =========================
  // BASICS
  // =========================
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with invalid form', () => {
    expect(component.professionalForm.invalid).toBeTrue();
  });

  // =========================
  // FORM VALID
  // =========================
  it('should be valid when form is filled correctly', () => {
    component.professionalForm.setValue({
      personalData: {
        name: 'Pedro Lima',
        birth: '1995-01-01',
        cpf: '52998224725',
        rg: '1234567',
        sex: 'male',
        phone: '83999999999',
        email: 'teste@email.com'
      },
      professionalData: {
        specialty: 'Cardiologia',
        registrationType: 'CRM',
        registrationJurisdiction: 'PB',
        registrationNumber: '12345'
      },
      address: {
        zipCode: '58000000',
        number: '123',
        street: 'Rua Teste',
        district: 'Centro',
        city: 'João Pessoa',
        state: 'PB'
      }
    });

    expect(component.professionalForm.valid).toBeTrue();
  });

  // =========================
  // SUBMIT SUCCESS
  // =========================
  it('should call create on submit (success)', () => {
    const mockResponse = { name: 'Pedro Lima' } as any;

    professionalServiceSpy.create.and.returnValue(of(mockResponse));

    component.professionalForm.setValue({
      personalData: {
        name: 'Pedro Lima',
        birth: '1995-01-01',
        cpf: '52998224725',
        rg: '1234567',
        sex: 'male',
        phone: '83999999999',
        email: 'teste@email.com'
      },
      professionalData: {
        specialty: 'Cardiologia',
        registrationType: 'CRM',
        registrationJurisdiction: 'PB',
        registrationNumber: '12345'
      },
      address: {
        zipCode: '58000000',
        number: '123',
        street: 'Rua Teste',
        district: 'Centro',
        city: 'João Pessoa',
        state: 'PB'
      }
    });

    component.onSubmit();

    expect(professionalServiceSpy.create).toHaveBeenCalled();
    expect(toastSpy.show).toHaveBeenCalledWith(
      'Profissional "Pedro Lima" cadastrado(a) com sucesso!',
      'success'
    );
  });

  // =========================
  // SUBMIT ERROR
  // =========================
  it('should handle error on submit', () => {
    professionalServiceSpy.create.and.returnValue(
      throwError(() => new Error('Erro'))
    );

    component.professionalForm.setValue({
      personalData: {
        name: 'Pedro Lima',
        birth: '1995-01-01',
        cpf: '52998224725',
        rg: '1234567',
        sex: 'male',
        phone: '83999999999',
        email: 'teste@email.com'
      },
      professionalData: {
        specialty: 'Cardiologia',
        registrationType: 'CRM',
        registrationJurisdiction: 'PB',
        registrationNumber: '12345'
      },
      address: {
        zipCode: '58000000',
        number: '123',
        street: 'Rua Teste',
        district: 'Centro',
        city: 'João Pessoa',
        state: 'PB'
      }
    });

    component.onSubmit();

    expect(toastSpy.show).toHaveBeenCalledWith(
      'Erro ao cadastrar profissional. Por favor, tente novamente.',
      'error'
    );
  });

  // =========================
  // CEP SUCCESS
  // =========================
  it('should fetch address when zipCode is valid', fakeAsync(() => {
    const mockCepResponse = {
      cep: '58000000',
      logradouro: 'Rua A',
      bairro: 'Centro',
      localidade: 'João Pessoa',
      uf: 'PB'
    };

    cepServiceSpy.getAddressByCep.and.returnValue(of(mockCepResponse));

    component.ngOnInit();

    component.addressGroup.get('zipCode')?.setValue('58000000');

    tick(500);
    fixture.detectChanges();

    const address = component.addressGroup.getRawValue();

    expect(address.street).toBe('Rua A');
    expect(address.city).toBe('João Pessoa');

    flush();
    discardPeriodicTasks();
    fixture.destroy();
  }));

  // =========================
  // CEP ERROR
  // =========================
  it('should handle CEP error', fakeAsync(() => {
    cepServiceSpy.getAddressByCep.and.returnValue(
      throwError(() => new Error('CEP error'))
    );

    component.ngOnInit();

    component.addressGroup.get('zipCode')?.setValue('58000000');

    tick(500);

    expect(toastSpy.show).toHaveBeenCalledWith(
      'Erro ao buscar endereço. Verifique o CEP.',
      'error'
    );

    flush();
    discardPeriodicTasks();
    fixture.destroy();
  }));
});