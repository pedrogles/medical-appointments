import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OverviewCardComponent } from '../overview-card/overview-card.component';
import { DashboardService } from '../../service/dashboard.service';
import { Subject, takeUntil } from 'rxjs';
import { IOverviewCard } from '../../interfaces/overviewCard.interface';

@Component({
  selector: 'app-overview-cards',
  standalone: true,
  imports: [OverviewCardComponent],
  templateUrl: './overview-cards.component.html',
  styleUrl: './overview-cards.component.scss'
})
export class OverviewCardsComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  cards: IOverviewCard[] = this.initializeCards();
  isLoading = true;
  
  private readonly dashboardService = inject(DashboardService);
  
  ngOnInit(): void {
    this.loadCardsData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  initializeCards(): IOverviewCard[] {
    return [
      { id: 0, title: 'Pacientes', icon: 'account_circle', iconColor: '#2196f3', count: 0 },
      { id: 1, title: 'Consultas Agendadas', icon: 'calendar_month', iconColor: '#2196f3', count: 0 },
      { id: 2, title: 'Consultas Realizadas', icon: 'check_circle', iconColor: '#4caf50', count: 0 },
      { id: 3, title: 'Consultas Canceladas', icon: 'cancel', iconColor: '#f44336', count: 0 }
    ];
  }

  loadCardsData(): void {
    this.dashboardService.getOverviewCardsData()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        const cardMap: Record<number, keyof typeof data> = {
          0: 'patients',
          1: 'appointments',
          2: 'realizedAppointments',
          3: 'canceledAppointments'
        }
        this.cards.forEach(card => {
          card.count = data[cardMap[card.id]];
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error("Falha na requisição:", error)
      }
    })
  }
}
