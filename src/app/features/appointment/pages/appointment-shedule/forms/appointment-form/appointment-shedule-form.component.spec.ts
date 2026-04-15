import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentSheduleFormComponent } from './appointment-shedule-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { AppointmentService } from '../../../../services/appointment.service';
import { PatientService } from '../../../../../patient/services/patient.service';
import { ProfessionalService } from '../../../../../professional/services/professional.service';
import { ToastService } from '../../../../../../core/services/toast/toast.service';

import { IPatient } from '../../../../../../core/interfaces/patient.interface';
import { IProfessional } from '../../../../../../core/interfaces/professional.interface';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AppointmentSheduleFormComponent', () => {
  let component: AppointmentSheduleFormComponent;
  let fixture: ComponentFixture<AppointmentSheduleFormComponent>;

  const appointmentServiceMock = {
    create: jasmine.createSpy().and.returnValue(of({})),
    getProfessionalAppointmentsByDate: jasmine.createSpy().and.returnValue(of([]))
  };

  const patientServiceMock = {
    search: jasmine.createSpy().and.returnValue(of([]))
  };

  const professionalServiceMock = {
    search: jasmine.createSpy().and.returnValue(of([]))
  };

  const toastServiceMock = {
    show: jasmine.createSpy()
  };

  const mockPatient: IPatient = {
    id: '1',
    name: 'Pedro',
    cpf: '12345678900',
    birth: '2000-01-01',
    rg: '1234567',
    sex: 'male',
    phone: '83999999999',
    email: 'pedro@email.com',
    address: {
      street: 'Rua A',
      number: '100',
      district: 'Centro',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58000000'
    }
  };

  const mockProfessional: IProfessional = {
    id: '2',
    name: 'Dr João',
    cpf: '98765432100',
    birth: '1980-01-01',
    rg: '7654321',
    sex: 'male',
    specialty: 'Cardiologia',
    registrationType: 'CRM',
    registrationNumber: '12345',
    registrationJurisdiction: 'PB',
    isActive: true,
    phone: '83988888888',
    email: 'dr@email.com',
    address: {
      street: 'Rua B',
      number: '200',
      district: 'Bairro',
      city: 'João Pessoa',
      state: 'PB',
      zipCode: '58000000'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppointmentSheduleFormComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceMock },
        { provide: PatientService, useValue: patientServiceMock },
        { provide: ProfessionalService, useValue: professionalServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentSheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with invalid form', () => {
    expect(component.appointmentForm.valid).toBeFalse();
  });

  it('should be valid when form is filled', () => {
    component.appointmentForm.setValue({
      patient: mockPatient,
      professional: mockProfessional,
      date: '2026-01-01',
      hour: '10:00',
      notes: 'Teste'
    });

    expect(component.appointmentForm.valid).toBeTrue();
  });

  it('should call create on submit', () => {
    component.appointmentForm.setValue({
      patient: mockPatient,
      professional: mockProfessional,
      date: '2026-01-01',
      hour: '10:00',
      notes: 'Teste'
    });

    component.onSubmit();

    expect(appointmentServiceMock.create).toHaveBeenCalled();
    expect(toastServiceMock.show).toHaveBeenCalledWith(
      'Consulta agendada com sucesso!',
      'success'
    );
  });

  it('should call getProfessionalAppointmentsByDate when professional and date change', fakeAsync(() => {
    const spy = spyOn<any>(component, 'getProfessionalAppointmentsByDate');

    component.formControls.professional.setValue(mockProfessional);
    component.formControls.date.setValue('2026-01-01');

    tick(500);

    expect(spy).toHaveBeenCalledWith('2', '2026-01-01');
  }));
});