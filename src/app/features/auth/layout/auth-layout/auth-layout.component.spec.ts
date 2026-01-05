import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayoutComponent } from './auth-layout.component';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
  });

  it('should create', () => {
    fixture.componentRef.setInput('title', 'Sign In');
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('when used in Login page', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('title', 'Sign In');
      fixture.detectChanges();
    });

    it('should render Sign In title', () => {
      const title = fixture.componentInstance.title();
      expect(title).toBe('Sign In');
    })
  });

  describe('when used in Register page', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('title', 'Sign Up');
      fixture.detectChanges();
    });

    it('should render Sign Up title', () => {
      const title = fixture.componentInstance.title();
      expect(title).toBe('Sign Up');
    })
  });
});
