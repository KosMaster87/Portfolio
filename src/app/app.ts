/**
 * @fileoverview Main application component.
 * @description Root component that bootstraps the Angular application.
 * @module app
 */

import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnalyticsService } from './core/services';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NotificationComponent, SwUpdateService } from '@ui/public-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolio-remaster');
  protected swUpdateService = inject(SwUpdateService);
  private analyticsService = inject(AnalyticsService);

  constructor() {
    this.swUpdateService.initialize();
    this.analyticsService.init();
  }
}
