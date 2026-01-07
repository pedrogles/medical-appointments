import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IMenuItem } from '../../../../core/interfaces/menu.interface';
import { menuItems } from '../../../../core/constants/menu.constant';
import { AuthService } from '../../../auth/service/auth/auth.service';

@Component({
  selector: 'medical-sidebar',
  standalone: true,
  imports: [MatDividerModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'  
})
export class SidebarComponent {
  menuItems: IMenuItem[] = menuItems;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

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