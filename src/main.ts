import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(
      [
        { path: '', component: HomeComponent, pathMatch: 'full' }
      ],
      withComponentInputBinding()
    ),
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
