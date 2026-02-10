import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/service/auth/auth.service';
import { IMenuItem } from '../../../../core/interfaces/menu.interface';
import { MENU_ITEMS } from '../../../../core/constants/menu.constant';

@Component({
  selector: 'medical-navbar',
  standalone: true,
  imports: [
    MatIconModule, 
    RouterModule, 
    MatDividerModule,
    MatMenuModule,
    MatButtonModule
  ],
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
  readonly menuItems: IMenuItem[] = MENU_ITEMS;

  isMenu = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onChangeMenuState(): void {
    this.isMenu = !this.isMenu;
  };

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