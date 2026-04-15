import { TestBed } from '@angular/core/testing';
import { AppointmentService } from './appointment.service';
import { SupabaseService } from '../../../core/services/supabase/supabase.service';
import { IAppointment } from '../../../core/interfaces/appointment.interface';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let supabaseMock: any;

  beforeEach(() => {
    supabaseMock = {
      client: {
        from: jasmine.createSpy().and.returnValue({
          insert: jasmine.createSpy().and.returnValue({
            select: jasmine.createSpy().and.returnValue({
              single: jasmine.createSpy()
            })
          }),
          select: jasmine.createSpy().and.returnValue({
            eq: jasmine.createSpy().and.returnValue({
              gte: jasmine.createSpy().and.returnValue({
                lte: jasmine.createSpy()
              })
            })
          })
        })
      }
    };

    TestBed.configureTestingModule({
      providers: [
        AppointmentService,
        { provide: SupabaseService, useValue: supabaseMock }
      ]
    });

    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create appointment successfully', (done) => {
    const mockAppointment: IAppointment = {
      id: '1',
      patientId: 'p1',
      professionalId: 'prof1',
      startDateTime: '2026-03-20T10:00:00Z',
      status: 'scheduled',
      createdAt: '2026-03-20T09:00:00Z',
      updatedAt: '2026-03-20T09:00:00Z'
    };

    const mockResponse = {
      data: mockAppointment,
      error: null
    };

    supabaseMock.client.from().insert().select().single.and.returnValue(
      Promise.resolve(mockResponse)
    );

    service.create({} as any).subscribe({
      next: (result) => {
        expect(result).toEqual(mockAppointment);
        done();
      }
    });
  });

  it('should throw error when create fails', (done) => {
    const mockResponse = {
      data: null,
      error: { message: 'Erro ao criar' }
    };

    supabaseMock.client.from().insert().select().single.and.returnValue(
      Promise.resolve(mockResponse)
    );

    service.create({} as any).subscribe({
      error: (err) => {
        expect(err.message).toBe('Erro ao criar');
        done();
      }
    });
  });

  it('should return list of appointment start datetimes', (done) => {
    const mockResponse = {
      data: [
        { start_datetime: '2026-03-20T10:00:00Z' },
        { start_datetime: '2026-03-20T11:00:00Z' }
      ],
      error: null
    };

    supabaseMock.client.from().select().eq().gte().lte.and.returnValue(
      Promise.resolve(mockResponse)
    );

    service.getProfessionalAppointmentsByDate('1', '2026-03-20')
      .subscribe((result) => {
        expect(result).toEqual([
          '2026-03-20T10:00:00Z',
          '2026-03-20T11:00:00Z'
        ]);
        done();
      });
  });

  it('should return empty array when no data', (done) => {
    const mockResponse = {
      data: null,
      error: null
    };

    supabaseMock.client.from().select().eq().gte().lte.and.returnValue(
      Promise.resolve(mockResponse)
    );

    service.getProfessionalAppointmentsByDate('1', '2026-03-20')
      .subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
  });

  it('should throw error when fetching fails', (done) => {
    const mockResponse = {
      data: null,
      error: { message: 'Erro ao buscar' }
    };

    supabaseMock.client.from().select().eq().gte().lte.and.returnValue(
      Promise.resolve(mockResponse)
    );

    service.getProfessionalAppointmentsByDate('1', '2026-03-20')
      .subscribe({
        error: (err) => {
          expect(err.message).toBe('Erro ao buscar');
          done();
        }
      });
  });
});