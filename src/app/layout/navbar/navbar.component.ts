import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { IMenuItem, menuItems } from '../../core/models/menu.model';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoComponent, MatIconModule, RouterModule, MatDividerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger("openClose", [
      state("open", 
        style({
          top: '4rem'
        })
      ),
      state("close", 
        style({
          top: '-25rem'
        })
      ),
      transition('open => close', [animate('1s ease-in')]),
      transition('close => open', [animate('1s ease-out')])
    ])
  ]
})
export class NavbarComponent {
  isMenu: boolean = false;
  
  menuItems: IMenuItem[] = menuItems;

  authService: AuthService = inject(AuthService);

  onChangeMenuState(): void {
    this.isMenu = !this.isMenu;
  }

  onLogout(): void {
    // Adicionar modal de confirmação
    this.authService.logout();
  }
}
