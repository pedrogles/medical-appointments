import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { enviroments } from '../enviroments/enviroments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    provideNgxMask(),
    provideFirebaseApp(() => initializeApp(enviroments.firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
