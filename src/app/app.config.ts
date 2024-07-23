import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { logInterceptor, SampleInterceptor } from './log.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(withInterceptors([authInterceptor,logInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),  
        {
            provide:HTTP_INTERCEPTORS,
            useClass:SampleInterceptor,
            multi:true
        },
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideToastr()
  ],
};
