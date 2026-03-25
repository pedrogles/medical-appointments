import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flush, tick } from '@angular/core/testing';
import { PatientRegistrationFormComponent } from './patient-registration-form.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PatientService } from '../../../../services/patient.service';
import { CepService } from '../../../../../../core/services/cep/cep.service';
import { ToastService } from '../../../../../../core/services/toast/toast.service';
import { of, throwError } from 'rxjs';

describe('PatientRegistrationFormComponent', () => {
  let component: PatientRegistrationFormComponent;
  let fixture: ComponentFixture<PatientRegistrationFormComponent>;

  let patientServiceSpy: jasmine.SpyObj<PatientService>;
  let cepServiceSpy: jasmine.SpyObj<CepService>;
  let toastSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    patientServiceSpy = jasmine.createSpyObj('PatientService', ['create']);
    cepServiceSpy = jasmine.createSpyObj('CepService', ['getAddressByCep']);
    toastSpy = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [PatientRegistrationFormComponent],
      providers: [
        provideNoopAnimations(),
        provideNgxMask(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: CepService, useValue: cepServiceSpy },
        { provide: ToastService, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientRegistrationFormComponent);
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
    expect(component.patientForm.invalid).toBeTrue();
  });

  // =========================
  // FORM VALID
  // =========================
  it('should be valid when form is filled correctly', () => {
    component.patientForm.setValue({
      personalData: {
        name: 'Pedro Lima',
        birth: '1995-01-01',
        cpf: '52998224725',
        rg: '1234567',
        sex: 'male',
        phone: '83999999999',
        email: 'teste@email.com'
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

    expect(component.patientForm.valid).toBeTrue();
  });

  // =========================
  // SUBMIT SUCCESS
  // =========================
  it('should call create on submit (success)', () => {
    const mockResponse = { name: 'Pedro Lima' } as any;

    patientServiceSpy.create.and.returnValue(of(mockResponse));

    component.patientForm.setValue({
      personalData: {
        name: 'Pedro Lima',
        birth: '1995-01-01',
        cpf: '52998224725',
        rg: '1234567',
        sex: 'male',
        phone: '83999999999',
        email: 'teste@email.com'
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

    expect(patientServiceSpy.create).toHaveBeenCalled();
    expect(toastSpy.show).toHaveBeenCalledWith(
      'Paciente "Pedro Lima" cadastrado(a) com sucesso!',
      'success'
    );
  });

  // =========================
  // SUBMIT ERROR
  // =========================
  it('should handle error on submit', () => {
    patientServiceSpy.create.and.returnValue(
      throwError(() => new Error('Erro'))
    );

    component.patientForm.setValue({
      personalData: {
        name: 'Pedro Lima',
        birth: '1995-01-01',
        cpf: '52998224725',
        rg: '1234567',
        sex: 'male',
        phone: '83999999999',
        email: 'teste@email.com'
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
      'Erro ao cadastrar paciente. Por favor, tente novamente.',
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

    tick(500); // debounce
    fixture.detectChanges();

    const address = component.addressGroup.getRawValue();

    expect(address.street).toBe('Rua A');
    expect(address.city).toBe('João Pessoa');

    // 🔥 LIMPEZA COMPLETA (ESSENCIAL)
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
  }));
});