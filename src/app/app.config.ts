import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { setAuthorizationHeadersInterceptor } from './core/interceptors/set-authorization-headers.interceptor';
import { apiResponseInterceptor } from './core/interceptors/api-response.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import THEME from './core/themes/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        setAuthorizationHeadersInterceptor,
        apiResponseInterceptor,
      ])
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: THEME,
        options: {
          darkModeSelector: false || 'none',
        }
      }
    })
  ]
};
