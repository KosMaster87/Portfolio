/**
 * @fileoverview AnalyticsService — selfhosted Umami script injection
 * @description Injects the Umami tracking script into <head> at app startup, mirroring how
 * SeoService manages meta tags. Cookie-less by design (Umami default config), so this needs
 * no consent banner.
 * @module core/services
 */

import { Injectable } from '@angular/core';

import { ANALYTICS } from '@core/constants/analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  /**
   * Injects the Umami script tag once, on app startup.
   * No-ops when `ANALYTICS.umamiWebsiteId` is empty — see analytics.ts for why.
   */
  init(): void {
    if (!ANALYTICS.umamiWebsiteId) {
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.src = ANALYTICS.umamiScriptUrl;
    script.setAttribute('data-website-id', ANALYTICS.umamiWebsiteId);
    document.head.appendChild(script);
  }
}
