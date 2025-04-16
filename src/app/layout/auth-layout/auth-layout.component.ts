import { Component, input } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  title = input.required<string>();
}
