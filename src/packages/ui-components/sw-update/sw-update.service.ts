/**
 * @fileoverview Service Worker update service
 * @description Full-lifecycle SwUpdate wrapper: periodic update checks, a single combined
 * notification signal for both "update ready" and "unrecoverable state" cases, and console
 * logging for the install-failure events the official Angular docs call out
 * (angular.dev/ecosystem/service-workers/communications) but which are easy to leave silent.
 */

import { ApplicationRef, Injectable, inject, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { SW_UPDATE_CHECK_INTERVAL_MS } from './sw-update-config';
import { SwUpdateTranslator } from './sw-update-translator';

export interface SwUpdateNotification {
  show: boolean;
  message: string;
  actionText: string;
  type: 'success' | 'error';
  /** Suppresses the consuming NotificationComponent's auto-dismiss timer. */
  persist: boolean;
}

type NotificationKind = 'update' | 'unrecoverable' | null;

const HIDDEN_NOTIFICATION: SwUpdateNotification = {
  show: false,
  message: '',
  actionText: '',
  type: 'success',
  persist: false,
};

@Injectable({
  providedIn: 'root',
})
export class SwUpdateService {
  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);
  private translator = inject(SwUpdateTranslator);
  private checkIntervalMs = inject(SW_UPDATE_CHECK_INTERVAL_MS);

  readonly notification = signal<SwUpdateNotification>(HIDDEN_NOTIFICATION);

  private notificationKind: NotificationKind = null;

  /**
   * Wire up periodic checks and event handling. No-op if the service worker isn't enabled
   * (e.g. dev mode).
   */
  initialize(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.checkForUpdatesRegularly();
    this.handleVersionUpdates();
    this.handleUnrecoverableState();
  }

  /**
   * Check for updates on an interval, only once the app has stabilized — starting the
   * interval immediately would itself prevent the app from ever reaching a stable state.
   */
  private checkForUpdatesRegularly(): void {
    const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable));
    const everyInterval$ = interval(this.checkIntervalMs);
    const everyIntervalOnceStable$ = concat(appIsStable$, everyInterval$);

    everyIntervalOnceStable$.subscribe(async () => {
      try {
        await this.swUpdate.checkForUpdate();
      } catch (error) {
        console.error('[SW Update] Update check failed:', error);
      }
    });
  }

  private handleVersionUpdates(): void {
    this.swUpdate.versionUpdates.subscribe((event) => {
      switch (event.type) {
        case 'VERSION_DETECTED':
          console.info(`[SW Update] Downloading new version: ${event.version.hash}`);
          break;
        case 'VERSION_READY':
          this.showUpdateReady();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.error(
            `[SW Update] Failed to install version '${event.version.hash}': ${event.error}`,
          );
          break;
        case 'NO_NEW_VERSION_DETECTED':
          break;
      }
    });
  }

  private showUpdateReady(): void {
    this.notificationKind = 'update';
    this.notification.set({
      show: true,
      message: this.translator.instant('UPDATE.message'),
      actionText: this.translator.instant('UPDATE.action'),
      type: 'success',
      persist: false,
    });
  }

  /**
   * The service worker couldn't serve a required, already-cached asset because a newer
   * deployment removed it server-side. Only a full reload recovers from this - the
   * notification stays up until the visitor acts (no auto-dismiss).
   */
  private handleUnrecoverableState(): void {
    this.swUpdate.unrecoverable.subscribe((event) => {
      console.error(`[SW Update] Unrecoverable state: ${event.reason}`);

      this.notificationKind = 'unrecoverable';
      this.notification.set({
        show: true,
        message: this.translator.instant('UPDATE.unrecoverableMessage'),
        actionText: this.translator.instant('UPDATE.reloadAction'),
        type: 'error',
        persist: true,
      });
    });
  }

  /**
   * Handle the notification's action button. Behavior depends on which case triggered it:
   * activate + reload for a ready update, plain reload for an unrecoverable state (there is
   * no valid version to activate).
   */
  onAction(): void {
    if (this.notificationKind === 'unrecoverable') {
      this.reloadPage();
      return;
    }

    this.swUpdate.activateUpdate().then(() => {
      this.reloadPage();
    });
  }

  dismiss(): void {
    this.notification.update((current) => ({ ...current, show: false }));
  }

  /**
   * Isolated on its own so tests can spy on it instead of `window.location.reload` directly -
   * `location` isn't reliably mockable across test environments (e.g. Karma's headless
   * Chrome refuses to redefine it at all).
   */
  protected reloadPage(): void {
    window.location.reload();
  }
}
