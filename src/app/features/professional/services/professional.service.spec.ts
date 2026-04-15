import { TestBed } from '@angular/core/testing';
import { ProfessionalService } from './professional.service';
import { SupabaseService } from '../../../core/services/supabase/supabase.service';
import { IProfessional } from '../../../core/interfaces/professional.interface';

describe('ProfessionalService', () => {
  let service: ProfessionalService;
  let supabaseMock: any;

  function createMockProfessional(overrides?: Partial<IProfessional>): IProfessional {
    return {
      id: '1',
      name: 'Dr. Pedro',
      cpf: '12345678900',
      specialty: 'Cardiologia',
      ...overrides
    } as IProfessional;
  }

  beforeEach(() => {
    supabaseMock = {
      client: {
        from: jasmine.createSpy('from')
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ProfessionalService,
        {
          provide: SupabaseService,
          useValue: supabaseMock
        }
      ]
    });

    service = TestBed.inject(ProfessionalService);
  });

  // =========================
  // BASICS
  // =========================
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // =========================
  // CREATE SUCCESS
  // =========================
  it('should create a professional successfully', (done) => {
    const mockProfessional = createMockProfessional({ name: 'Dr. Pedro' });

    const mockResponse = {
      data: mockProfessional,
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
      expect(result).toEqual(mockProfessional);
      expect(supabaseMock.client.from).toHaveBeenCalledWith('professionals');
      done();
    });
  });

  // =========================
  // CREATE ERROR
  // =========================
  it('should throw error when create fails', (done) => {
    const mockResponse = {
      data: null,
      error: { message: 'Erro ao inserir profissional' }
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
        expect(err.message).toBe('Erro ao inserir profissional');
        done();
      }
    });
  });

  // =========================
  // SEARCH SUCCESS
  // =========================
  it('should search professionals successfully', (done) => {
    const mockProfessionals = [
      createMockProfessional({ name: 'Dr. Pedro' })
    ];

    const mockResponse = {
      data: mockProfessionals,
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
      expect(result[0].name).toBe('Dr. Pedro');
      done();
    });
  });

  // =========================
  // SEARCH ERROR
  // =========================
  it('should throw error when search fails', (done) => {
    const mockResponse = {
      data: null,
      error: { message: 'Erro na busca de profissionais' }
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
        expect(err.message).toBe('Erro na busca de profissionais');
        done();
      }
    });
  });
});