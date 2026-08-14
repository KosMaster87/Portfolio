import { TestBed } from '@angular/core/testing';

import { ANALYTICS } from '../constants/analytics';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    service = TestBed.inject(AnalyticsService);
  });

  afterEach(() => {
    document
      .querySelectorAll('script[data-website-id]')
      .forEach((script) => script.parentElement?.removeChild(script));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject the Umami script with the configured website ID', () => {
    service.init();
    const script = document.head.querySelector<HTMLScriptElement>('script[data-website-id]');
    expect(script).toBeTruthy();
    expect(script?.getAttribute('data-website-id')).toBe(ANALYTICS.umamiWebsiteId);
    expect(script?.src).toBe(ANALYTICS.umamiScriptUrl);
    expect(script?.defer).toBe(true);
  });
});
