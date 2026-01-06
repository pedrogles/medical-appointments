import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayoutComponent } from './auth-layout.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <medical-auth-layout [title]="'Login'">
      <p class="projected-content">Projected content</p>
    </medical-auth-layout>
  `
})
class TestHostComponent {}

describe('AuthLayoutComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayoutComponent],
      declarations: [TestHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should render the title', () => {
    const titleEl = fixture.debugElement.query(By.css('h1.title'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Login');
  });

  it('should render the medical logo', () => {
    const logoEl = fixture.debugElement.query(By.css('#medical-logo'));
    expect(logoEl).toBeTruthy();
    expect(logoEl.nativeElement.getAttribute('src')).toBe('medical-logo.svg');
  });

  it('should project content via ng-content', () => {
    const projectedEl = fixture.debugElement.query(By.css('.projected-content'));
    expect(projectedEl).toBeTruthy();
    expect(projectedEl.nativeElement.textContent.trim()).toBe('Projected content');
  });
});
