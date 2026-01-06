import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../layout/app-layout/app-layout.component';

@Component({
  selector: 'medical-dashboard',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
