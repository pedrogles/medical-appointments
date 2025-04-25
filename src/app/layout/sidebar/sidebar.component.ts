import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth/auth.service';
import { IMenuItem } from '../../core/interfaces/menu.interface';
import { menuItems } from '../../core/constants/menu.constant';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LogoComponent, MatDividerModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'  
})
export class SidebarComponent {
  menuItems: IMenuItem[] = menuItems;

  authService: AuthService = inject(AuthService);

  onLogout(): void {
    // Adicionar modal de confirmação
    this.authService.logout();
  }
}
