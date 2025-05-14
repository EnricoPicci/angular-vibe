import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ...other providers
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
