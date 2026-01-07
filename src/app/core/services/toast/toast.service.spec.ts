import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ToastService', () => {
  const ACTION_LABEL = 'Fechar';

  let service: ToastService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should open snackbar with default config', () => {
      service.show('Test message');
      expect(snackBarSpy.open).toHaveBeenCalledWith('Test message', ACTION_LABEL, {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['toast-info']
      });
    });
    
    it('should open snackbar with custom type and duration', () => {
      service.show('Warning message', 'warning', 6000);
      expect(snackBarSpy.open).toHaveBeenCalledWith('Warning message', ACTION_LABEL, {
        duration: 6000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['toast-warning']
      });
    });
  });
});
