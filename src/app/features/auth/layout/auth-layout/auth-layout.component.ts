import { Component, input } from '@angular/core';

@Component({
  selector: 'medical-auth-layout',
  standalone: true,
  imports: [],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  title = input.required<string>();
}
