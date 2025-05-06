import { Component, EventEmitter, HostListener, input, Output } from '@angular/core';

@Component({
  selector: 'app-agenda-item',
  standalone: true,
  imports: [],
  templateUrl: './agenda-item.component.html',
  styleUrl: './agenda-item.component.scss'
})
export class AgendaItemComponent {
  patientName = input.required<string>();
  hour = input.required<string>();

  @Output() onClick = new EventEmitter<void>();

  @HostListener('click')
  onHostClick() {
    this.onClick.emit();
  }
}
