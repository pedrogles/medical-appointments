import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IZipCode } from '../../interfaces/zipCode.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private readonly baseUrl = 'http://viacep.com.br/ws';
  private readonly http = inject(HttpClient);

  getZipCodeData(zipCode: number): Observable<IZipCode> {
    return this.http.get<IZipCode>(`${this.baseUrl}/${zipCode}/json/`);
  }
}
