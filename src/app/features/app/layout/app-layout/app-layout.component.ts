import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'medical-app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  title = input.required<string>();
  isMobile!: boolean;
  
  private destroy$ = new Subject<void>();
  private readonly breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1023px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isMobile = value.matches;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}