/**
 * @fileoverview DI token for the periodic update-check interval
 * @description Defaults to 6 hours, matching the official Angular recommendation
 * (angular.dev/ecosystem/service-workers/communications). Override per app with:
 * `{ provide: SW_UPDATE_CHECK_INTERVAL_MS, useValue: 10 * 60 * 1000 }`
 */

import { InjectionToken } from '@angular/core';

export const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

export const SW_UPDATE_CHECK_INTERVAL_MS = new InjectionToken<number>(
  'SW_UPDATE_CHECK_INTERVAL_MS',
  { providedIn: 'root', factory: () => SIX_HOURS_MS },
);
