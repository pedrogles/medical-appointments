import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h1>Dashboard</h1>
  `
})
class TestHostComponent {}

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    const titleEl = fixture.debugElement.query(By.css('h1'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Dashboard');
  });
});
