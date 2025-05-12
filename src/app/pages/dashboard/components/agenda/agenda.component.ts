import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AgendaItemComponent } from '../agenda-item/agenda-item.component';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../service/dashboard.service';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { getDate, getHour } from '../../../../shared/utils/date.util';
import { IAppointment } from '../../../../core/interfaces/appointment.interface';
import { IChartData } from '../../interfaces/chartData.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [AgendaItemComponent, BaseChartDirective, SpinnerComponent, CommonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  appointments: Partial<IAppointment>[] = [];
  nextAppointment: string = '';
  chartData!: IChartData;
  lineChartData!: ChartConfiguration['data'];
  lineChartOptions: ChartConfiguration['options'];
  lineChartType!: ChartType;
  checkHour$ = new Subscription();
  isLoading = { patients: true, nextAppointment: true, chartData: true };

  private readonly dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.loadDashboardData();
    this.startCheckHour();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.loadPatientsByDate();
    this.loadChartData();
  }
  
  loadPatientsByDate(): void {
    // Converte string em formato 00-00-0000 em number 000000
    const date = Number(getDate().replace(/-/g, ""));
    this.dashboardService.getAppointmentsByDate(date)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (appointments) => { 
        this.appointments = appointments; 
        this.isLoading.patients = false;
        this.getNextAppointment(appointments);
      },
      error: (error) => {
        this.isLoading.patients = false
        console.error("Falha na requisição:", error)
      }
    })
  }

  loadChartData(): void {
    this.dashboardService.getChartData()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (chartData) => {
        const data = { data: chartData.data, labels: chartData.labels }
        this.initializeChart(data);
        this.isLoading.chartData = false;
      },
      error: (error) => {
        this.isLoading.chartData = false
        console.error("Falha na requisição:", error)
      }
    })
  }

  initializeChart(chartData: IChartData): void {
    this.lineChartData = {
      datasets: [
        {
          data: chartData.data,
          backgroundColor: '#e0e0e040',
          borderColor: '#6b7280',
          fill: 'origin',
        }
      ],
      labels: chartData.labels
    };
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      elements: { line: { tension: 0.5 } },
      scales: {
        x: { ticks: { display: true } },
        y: { ticks: { display: true } }
      }
    };
    this.lineChartType = 'line';
  }

  getNextAppointment(appointments: Partial<IAppointment>[]) {
    const appointment = appointments.find((appointment: Partial<IAppointment>) => appointment.hour && appointment.hour >= getHour());
    this.nextAppointment = appointment?.hour ?? '--';
    this.isLoading.nextAppointment = false;
  }
  
  startCheckHour(): void {
    this.checkHour$.unsubscribe();
    this.checkHour$ = interval(10000)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      if(this.nextAppointment < getHour()) {
        this.getNextAppointment(this.appointments);
      }
    })
  }
}