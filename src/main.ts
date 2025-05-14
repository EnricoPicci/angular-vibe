import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { WikiDetailComponent } from './app/pages/wiki-detail/wiki-detail.component';
import { WikiDetailGuard } from './app/guards/wiki-detail.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(
      [
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'detail/:key', component: WikiDetailComponent, canActivate: [WikiDetailGuard] },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ],
      withComponentInputBinding()
    ),
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
