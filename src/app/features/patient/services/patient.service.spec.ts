import { TestBed } from '@angular/core/testing';
import { PatientService } from './patient.service';
import { SupabaseService } from '../../../core/services/supabase/supabase.service';
import { IPatient } from '../../../core/interfaces/patient.interface';

describe('PatientService', () => {
  let service: PatientService;
  let supabaseMock: any;

  function createMockPatient(overrides?: Partial<IPatient>): IPatient {
    return {
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
      },
      ...overrides
    };
  }

  beforeEach(() => {
    supabaseMock = {
      client: {
        from: jasmine.createSpy('from')
      }
    };

    TestBed.configureTestingModule({
      providers: [
        PatientService,
        {
          provide: SupabaseService,
          useValue: supabaseMock
        }
      ]
    });

    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a patient successfully', (done) => {
    const mockPatient = createMockPatient({ name: 'Pedro' });

    const mockResponse = {
      data: mockPatient,
      error: null
    };

    const insertSpy = jasmine.createSpy().and.returnValue({
      select: () => ({
        single: () => Promise.resolve(mockResponse)
      })
    });

    supabaseMock.client.from.and.returnValue({
      insert: insertSpy
    });

    service.create({} as any).subscribe((result) => {
      expect(result).toEqual(mockPatient);
      expect(supabaseMock.client.from).toHaveBeenCalledWith('patients');
      done();
    });
  });

  it('should throw error when create fails', (done) => {
    const mockResponse = {
      data: null,
      error: { message: 'Erro ao inserir' }
    };

    const insertSpy = jasmine.createSpy().and.returnValue({
      select: () => ({
        single: () => Promise.resolve(mockResponse)
      })
    });

    supabaseMock.client.from.and.returnValue({
      insert: insertSpy
    });

    service.create({} as any).subscribe({
      next: () => fail('should not succeed'),
      error: (err) => {
        expect(err.message).toBe('Erro ao inserir');
        done();
      }
    });
  });

  it('should search patients successfully', (done) => {
    const mockPatients = [
      createMockPatient({ name: 'Pedro' })
    ];

    const mockResponse = {
      data: mockPatients,
      error: null
    };

    const queryMock = {
      select: () => ({
        or: () => ({
          limit: () => Promise.resolve(mockResponse)
        })
      })
    };

    supabaseMock.client.from.and.returnValue(queryMock);

    service.search('Pedro').subscribe((result) => {
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Pedro');
      done();
    });
  });

  it('should throw error when search fails', (done) => {
    const mockResponse = {
      data: null,
      error: { message: 'Erro na busca' }
    };

    const queryMock = {
      select: () => ({
        or: () => ({
          limit: () => Promise.resolve(mockResponse)
        })
      })
    };

    supabaseMock.client.from.and.returnValue(queryMock);

    service.search('Pedro').subscribe({
      next: () => fail('should not succeed'),
      error: (err) => {
        expect(err.message).toBe('Erro na busca');
        done();
      }
    });
  });
});