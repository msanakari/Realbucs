import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderConfig, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { authInterceptorFn } from './interceptor/auth-interceptor';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#024FF0',
  fgsType: 'three-strings',
  fgsSize: 75,
  hasProgressBar: true,
  fastFadeOut: true,
  pbThickness: 3,
  pbColor: '#024FF0',
  overlayColor: 'rgba(0, 0, 0, 0.3)',
  overlayBorderRadius: '10px'
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptorsFromDi(),withInterceptors([authInterceptorFn])), provideToastr(), importProvidersFrom(
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      exclude:[
        "https://realbucs.com/apiadmin/api/v1/get_settings",
      ]
    })
  ),]
};
