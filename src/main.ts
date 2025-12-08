/**
 * @fileoverview Main entry point for the Angular application.
 * @description Bootstraps the root application component with necessary providers.
 * @module main
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
