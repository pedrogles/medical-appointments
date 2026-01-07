import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../../auth/service/auth/auth.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    authService.logout.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        NoopAnimationsModule,
        MatIconModule,
        MatDividerModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
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

    it('should render menu button initially', () => {
      const button = fixture.nativeElement.querySelector('.menu-btn');
      expect(button).toBeTruthy();
    });

    it('should toggle menu state when clicking button', () => {
      const button = fixture.nativeElement.querySelector('.menu-btn');
      button.click();
      fixture.detectChanges();
      expect(component.isMenu).toBeTrue();
    });

    it('should render menu items when menu is open', () => {
      component.isMenu = true;
      fixture.detectChanges();
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