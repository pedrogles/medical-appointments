import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { IPatient } from '../../interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private readonly baseUrl = enviroments.baseUrl;
  private readonly http = inject(HttpClient);

  getAll(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(`${this.baseUrl}/patients`);
  }

  create(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(`${this.baseUrl}/patients`, patient);
  }
}
