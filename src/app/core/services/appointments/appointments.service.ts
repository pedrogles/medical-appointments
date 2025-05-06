import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../enviroments/enviroments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLastDayOfMonth } from '../../../shared/utils/date.util';
import { IAppointment } from '../../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly baseUrl = enviroments.baseUrl;
  private readonly http = inject(HttpClient);

  getAll(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/appointments`);
  }

  getByStatus(status: string): Observable<IAppointment[]> {
    let query = { status: status };
    let params = new HttpParams({ fromObject: query})
    return this.http.get<IAppointment[]>(`${this.baseUrl}/appointments`, { params });
  }

  getByDate(date: number): Observable<IAppointment[]> {
    let query = { date, _sort: 'hour', _order: 'asc' };
    let params = new HttpParams({ fromObject: query})
    return this.http.get<IAppointment[]>(`${this.baseUrl}/appointments`, { params });
  }

  getByMonth(month: number, year: number): Observable<IAppointment[]> {
    const formattedMonth = String(month).padStart(2, '0');
    let query = { 
      date_gte: Number(`${year}${formattedMonth}01`), 
      date_lte: Number(`${year}${formattedMonth}${getLastDayOfMonth(year, month)}`) 
    };
    let params = new HttpParams({ fromObject: query})
    return this.http.get<IAppointment[]>(`${this.baseUrl}/appointments`, { params });
  }
}
