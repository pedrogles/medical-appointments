import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let fixture: ComponentFixture<PageHeaderComponent>;
  let component: PageHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);

    fixture.componentRef.setInput('title', 'Agendamento');

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h1');

    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toContain('Agendamento');
  });

  it('should update the title when input changes', () => {
    fixture.componentRef.setInput('title', 'Novo Título');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h1');

    expect(titleElement?.textContent).toContain('Novo Título');
  });
});