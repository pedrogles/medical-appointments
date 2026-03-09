import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ViaCepResponse } from '../../types/viaCepResponse.type';
import { Observable } from 'rxjs';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private readonly http = inject(HttpClient);

  getAddressByCep(cep: number): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`${environments.viaCepUrl}/${cep}/json/`);
  }
}
