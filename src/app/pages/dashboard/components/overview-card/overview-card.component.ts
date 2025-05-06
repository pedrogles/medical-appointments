import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-overview-card',
  standalone: true,
  imports: [MatIconModule, CommonModule, SpinnerComponent],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.scss'
})
export class OverviewCardComponent {
  icon = input.required<string>();
  title = input.required<string>();
  count = input.required<number>();
  
  iconColor = input<string>();
  isLoading = input<boolean>();
}
