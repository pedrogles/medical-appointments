import { Component } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { IMenuItem, menuItems } from '../../core/models/menu.model';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LogoComponent, MatDividerModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'  
})
export class SidebarComponent {
  menuItems: IMenuItem[] = menuItems;
}
