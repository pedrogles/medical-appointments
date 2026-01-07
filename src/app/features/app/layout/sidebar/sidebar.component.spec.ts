import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../../auth/service/auth/auth.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    authService.logout.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        NoopAnimationsModule,
        MatIconModule,
        MatDividerModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logo = fixture.nativeElement.querySelector('#medical-logo');
    expect(logo).toBeTruthy();
  });

  it('should render menu items', () => {
    const items = fixture.nativeElement.querySelectorAll('.menu-item');
    expect(items.length).toBe(component.menuItems.length);
  });

  it('should call logout and navigate on logout button click', () => {
    const logoutButton = fixture.nativeElement.querySelector('.logout-btn');
    logoutButton.click();
    fixture.detectChanges();

    expect(authService.logout).toHaveBeenCalled();
  });
});