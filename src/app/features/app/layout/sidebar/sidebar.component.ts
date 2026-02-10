import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IMenuItem } from '../../../../core/interfaces/menu.interface';
import { MENU_ITEMS } from '../../../../core/constants/menu.constant';
import { AuthService } from '../../../auth/service/auth/auth.service';

@Component({
  selector: 'medical-sidebar',
  standalone: true,
  imports: [
    MatDividerModule, 
    RouterModule, 
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'  
})
export class SidebarComponent {
  readonly menuItems: IMenuItem[] = MENU_ITEMS;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(["auth/login"]);
      },
      error: (error) => {
        // Adicionar toast de erro
        console.log(error)
      }
    })
  }
}