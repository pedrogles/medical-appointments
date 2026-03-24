import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentReviewComponent } from './appointment-review.component';
import { AppointmentReview } from '../../../../../../../core/types/appointment.type';

describe('AppointmentReviewComponent', () => {
  let component: AppointmentReviewComponent;
  let fixture: ComponentFixture<AppointmentReviewComponent>;

  const mockReview: AppointmentReview = {
    patientName: 'Pedro',
    patientCPF: '123.456.789-00',
    professionalName: 'Dr. João',
    professionalSpecialty: 'Cardiologia',
    date: '2025-01-01',
    time: '08:00',
    notes: 'Consulta de rotina'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppointmentReviewComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentReviewComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('appointmentReview', mockReview);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all review data', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Pedro');
    expect(el.textContent).toContain('123.456.789-00');
    expect(el.textContent).toContain('Dr. João');
    expect(el.textContent).toContain('Cardiologia');
    expect(el.textContent).toContain('2025-01-01');
    expect(el.textContent).toContain('08:00');
    expect(el.textContent).toContain('Consulta de rotina');
  });

  it('should update view when input changes', () => {
    const updated: AppointmentReview = {
      ...mockReview,
      patientName: 'Maria'
    };

    fixture.componentRef.setInput('appointmentReview', updated);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Maria');
    expect(el.textContent).not.toContain('Pedro');
  });
});