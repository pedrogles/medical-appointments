import { Component } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoComponent, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger("openClose", [
      state("open", 
        style({
          transform: 'translateY(62%)',
        })
      ),
      state("close", 
        style({
          transform: 'translateY(-63%)',
        })
      ),
      transition('open => close', [animate('1s ease-in')]),
      transition('close => open', [animate('1s ease-out')])
    ])
  ]
})
export class NavbarComponent {
  isMenu: boolean = false;

  menuItems = [
    { label: 'Agendamento de Consulta', route: '/' },
    { label: 'Cadastro de Paciente', route: '/' },
    { label: 'Lista de Pacientes', route: '/' },
    { label: 'Lista de Consultas', route: '/' }
  ];

  onChangeMenuState(): void {
    this.isMenu = !this.isMenu;
  }
}
