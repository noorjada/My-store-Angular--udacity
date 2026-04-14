import { bootstrapApplication } from '@angular/platform-browser';
// Triggering rebuild for assets refresh
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
