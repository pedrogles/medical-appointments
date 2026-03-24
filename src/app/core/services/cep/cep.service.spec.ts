import { TestBed } from '@angular/core/testing';
import { CepService } from './cep.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environments } from '../../../../environments/environments';
import { ViaCepResponse } from '../../types/viaCepResponse.type';
import { provideHttpClient } from '@angular/common/http';

describe('CepService', () => {
  let service: CepService;
  let httpMock: HttpTestingController;

  const mockResponse: ViaCepResponse = {
    cep: '58000-000',
    logradouro: 'Rua Teste',
    bairro: 'Centro',
    localidade: 'João Pessoa',
    uf: 'PB'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CepService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call ViaCEP API with correct URL and method', () => {
    const cep = 58000000;

    service.getAddressByCep(cep).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environments.viaCepUrl}/${cep}/json/`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const cep = 58000000;

    let errorResponse: any;

    service.getAddressByCep(cep).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        errorResponse = error;
      }
    });

    const req = httpMock.expectOne(
      `${environments.viaCepUrl}/${cep}/json/`
    );

    req.flush('Erro', { status: 404, statusText: 'Not Found' });

    expect(errorResponse.status).toBe(404);
  });
});