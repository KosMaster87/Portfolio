/**
 * @fileoverview Main application component.
 * @description Root component that bootstraps the Angular application.
 * @module app
 */

import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnalyticsService, SwUpdateService, TranslationService } from './core/services';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NotificationComponent } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolio-remaster');
  protected swUpdateService = inject(SwUpdateService);
  private translationService = inject(TranslationService);
  private analyticsService = inject(AnalyticsService);

  protected updateActionText = computed(() => this.translationService.instant('UPDATE.action'));

  constructor() {
    this.swUpdateService.initialize();
    this.analyticsService.init();
  }

  /**
   * Handle update notification close
   * User can either dismiss or will be prompted again on next check
   */
  protected onUpdateDismissed(): void {
    this.swUpdateService.dismissUpdate();
  }

  /**
   * Handle update button click
   * Activates the new version and reloads the page
   */
  protected onUpdateAccepted(): void {
    this.swUpdateService.activateUpdate();
  }
}
