import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../auth/service/auth/auth.service';
import { IMenuItem } from '../../../../core/interfaces/menu.interface';
import { menuItems } from '../../../../core/constants/menu.constant';

@Component({
  selector: 'medical-navbar',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatDividerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger("openClose", [
      state("open", style({ top: '4rem' })),
      state("close", style({ top: '-25rem' })),
      transition('open => close', [animate('1s ease-in')]),
      transition('close => open', [animate('1s ease-out')])
    ])
  ]
})
export class NavbarComponent {
  isMenu = false;
  menuItems: IMenuItem[] = menuItems;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onChangeMenuState(): void {
    this.isMenu = !this.isMenu;
  };

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Adicionar toast de confirmação
        this.router.navigate(["auth/login"]);
      },
      error: (error) => {
        // Adicionar toast de erro
        console.log(error)
      }
    })
  }
}