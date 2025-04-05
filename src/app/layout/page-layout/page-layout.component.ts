import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  isMobile!: boolean;
  breakpointObserver = inject(BreakpointObserver);

  onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1023px)'])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.isMobile = value.matches;
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
