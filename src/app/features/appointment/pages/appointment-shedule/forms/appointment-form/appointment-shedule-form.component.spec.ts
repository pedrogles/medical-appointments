import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentSheduleFormComponent } from './appointment-shedule-form.component';

describe('AppointmentSheduleFormComponent', () => {
  let component: AppointmentSheduleFormComponent;
  let fixture: ComponentFixture<AppointmentSheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSheduleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentSheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
