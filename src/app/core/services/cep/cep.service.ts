import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ViaCepResponse } from '../../types/viaCepResponse.type';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private readonly http = inject(HttpClient);

  getAddressByCep(cep: number): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`${environment.viaCepUrl}/${cep}/json/`);
  }
}
