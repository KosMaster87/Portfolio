/**
 * @fileoverview Selfhosted Umami analytics configuration.
 * @description Umami container is live on Unraid (see dev2k-wiki
 * infra/unraid/docs/manual/services/12-umami.md), website registered 14.08.2026.
 */
export const ANALYTICS = {
  umamiScriptUrl: 'https://stats.dev2ksoftware.com/script.js',
  umamiWebsiteId: 'a14c466e-4716-48e8-aec2-705de9a2f600',
} as const;
