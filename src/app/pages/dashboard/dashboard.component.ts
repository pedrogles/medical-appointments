import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { OverviewCardsComponent } from './components/overview-cards/overview-cards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageLayoutComponent, AgendaComponent, OverviewCardsComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
