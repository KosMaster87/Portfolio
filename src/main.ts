/**
 * @fileoverview This is the main entry point of the Angular application.
 * It bootstraps the AppComponent with the provided application configuration.
 * @description This file imports necessary modules and initializes the Angular application.
 * @module main
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
