import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  title = input.required<string>();
  isMobile!: boolean;
  
  breakpointObserver = inject(BreakpointObserver);

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
