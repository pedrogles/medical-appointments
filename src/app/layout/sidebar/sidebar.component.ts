import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/service/auth.service';
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
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Adicionar toast de confirmação
        this.router.navigateByUrl("/login");
      },
      error: (error) => {
        // Adicionar toast de erro
        console.log(error)
      }
    })
  }
}
