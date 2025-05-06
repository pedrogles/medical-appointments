import { inject, Injectable } from '@angular/core';
import { PatientsService } from '../../../core/services/patients/patients.service';
import { AppointmentsService } from '../../../core/services/appointments/appointments.service';
import { catchError, forkJoin, map, Observable, of, ReplaySubject } from 'rxjs';
import { getMonth, getYear } from '../../../shared/utils/date.util';
import { IOverviewCardsData } from '../interfaces/overviewCardsData.interface';
import { IAppointment } from '../../../core/interfaces/appointment.interface';
import { IChartData } from '../interfaces/chartData.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private overviewCardsDataSubject = new ReplaySubject<IOverviewCardsData>(1);
  private appointmentsByDateSubject = new ReplaySubject<Partial<IAppointment>[]>(1);
  private chartDataSubject = new ReplaySubject<IChartData>(1);
  private hasFetched = {
    overviewCardsData: false,
    appointmentsByDate: false,
    chartData: false
  };

  private readonly patientsService = inject(PatientsService);
  private readonly appointmentsService = inject(AppointmentsService);

  getOverviewCardsData(): Observable<IOverviewCardsData> {
    if(this.hasFetched.overviewCardsData) {
      return this.overviewCardsDataSubject.asObservable();
    }

    this.hasFetched.overviewCardsData = true;

    forkJoin({
      patients: this.patientsService.getAll().pipe(catchError(() => of([]))),
      appointments: this.appointmentsService.getAll().pipe(catchError(() => of([]))),
      realizedAppointments: this.appointmentsService.getByStatus("realizado").pipe(catchError(() => of([]))),
      canceledAppointments: this.appointmentsService.getByStatus("cancelado").pipe(catchError(() => of([])))
    }).pipe(
      map(({ patients, appointments, realizedAppointments, canceledAppointments }) => {
        return {
          patients: patients.length,
          appointments: appointments.length,
          realizedAppointments: realizedAppointments.length,
          canceledAppointments: canceledAppointments.length
        }
      })
    ).subscribe((response) => this.overviewCardsDataSubject.next(response));

    return this.overviewCardsDataSubject.asObservable();
  }

  getAppointmentsByDate(date: number): Observable<Partial<IAppointment>[]> {
    if(this.hasFetched.appointmentsByDate) {
      return this.appointmentsByDateSubject.asObservable();
    };

    this.hasFetched.appointmentsByDate = true;

    this.appointmentsService.getByDate(date).pipe(
      map((appointments) =>  
        appointments.map((appointment: Partial<IAppointment>) => ({
          id: appointment.id,
          patient: appointment.patient,
          hour: appointment.hour
        }))
      ),
      catchError(() => of([]))
    ).subscribe((response) => this.appointmentsByDateSubject.next(response));

    return this.appointmentsByDateSubject.asObservable();
  }

  getChartData(): Observable<IChartData> {
    if(this.hasFetched.chartData) {
      return this.chartDataSubject.asObservable();
    };

    this.hasFetched.chartData = true;

    const year = getYear();
    const month = getMonth();
    const semester = month <= 6 ? 
      { months: [1,2,3,4,5,6], names: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] } :
      { months: [7,8,9,10,11,12], names: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] };
    const requests = semester.months.map(month => 
      this.appointmentsService.getByMonth(month, year).pipe(catchError(() => of([])))
    );

    forkJoin(requests).pipe(
      map((results) => {
        return {
          data: results.map(result => result.length),
          labels: semester.names
        }
      })
    ).subscribe((response) =>  this.chartDataSubject.next(response));

    return this.chartDataSubject.asObservable();
  }

  refreshFetchedFlags(): void {
    this.hasFetched = {
      overviewCardsData: false,
      appointmentsByDate: false,
      chartData: false
    }
  }
}
