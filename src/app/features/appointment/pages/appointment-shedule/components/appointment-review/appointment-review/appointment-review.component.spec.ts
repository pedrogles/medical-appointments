import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentReviewComponent } from './appointment-review.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppointmentReviewComponent', () => {
  let component: AppointmentReviewComponent;
  let fixture: ComponentFixture<AppointmentReviewComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AppointmentReviewComponent>>;

  const mockData = {
    patientName: 'Pedro',
    patientCPF: '12345678900',
    professionalName: 'Dr. João',
    professionalSpecialty: 'Cardiologia',
    time: '10:00',
    date: '2026-06-10'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        AppointmentReviewComponent, // standalone component
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // =========================
  // 🧪 Testes básicos
  // =========================

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // =========================
  // 🧪 Renderização
  // =========================

  it('should render appointment data correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Pedro');
    expect(compiled.textContent).toContain('12345678900');
    expect(compiled.textContent).toContain('Dr. João');
    expect(compiled.textContent).toContain('Cardiologia');
    expect(compiled.textContent).toContain('10:00');
    expect(compiled.textContent).toContain('2026-06-10');
  });

  // =========================
  // 🧪 Ações diretas (métodos)
  // =========================

  it('should close dialog with true when confirm() is called', () => {
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when cancel() is called', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  // =========================
  // 🧪 Interação com DOM
  // =========================

  it('should call confirm() when confirm button is clicked', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.confirm-btn');

    button.click();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should call cancel() when cancel button is clicked', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.cancel-btn');

    button.click();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});