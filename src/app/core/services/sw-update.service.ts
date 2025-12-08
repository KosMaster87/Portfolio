/**
 * @fileoverview Service Worker update service
 * @description Checks for application updates and notifies users when new version is available
 * @module core/services/sw-update
 */

import { ApplicationRef, Injectable, inject, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, filter, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class SwUpdateService {
  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);
  private translationService = inject(TranslationService);

  showUpdateNotification = signal<boolean>(false);
  updateMessage = signal<string>('');

  /**
   * Initialize update checking
   */
  initialize(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.checkForUpdatesRegularly();
    this.handleVersionUpdates();
  }

  /**
   * Check for updates regularly after app is stable
   */
  private checkForUpdatesRegularly(): void {
    const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable));
    const everyTenMinutes$ = interval(10 * 60 * 1000); // Check every 10 minutes
    const everyTenMinutesOnceAppIsStable$ = concat(appIsStable$, everyTenMinutes$);

    everyTenMinutesOnceAppIsStable$.subscribe(async () => {
      try {
        await this.swUpdate.checkForUpdate();
      } catch (error) {
        console.error('[SW Update] Update check failed:', error);
      }
    });
  }

  /**
   * Handle version update events
   */
  private handleVersionUpdates(): void {
    this.swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => {
        this.updateMessage.set(this.translationService.instant('UPDATE.message'));
        this.showUpdateNotification.set(true);
      });
  }

  /**
   * Activate new version and reload page
   */
  activateUpdate(): void {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }

  /**
   * Dismiss update notification
   */
  dismissUpdate(): void {
    this.showUpdateNotification.set(false);
  }
}
