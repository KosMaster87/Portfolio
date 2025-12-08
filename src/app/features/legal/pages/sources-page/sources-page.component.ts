/**
 * @fileoverview Sources page component.
 * @description Displays attribution for icons, graphics, and other visual resources used on the website.
 * @module features/legal/pages/sources-page
 */

import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-sources-page',
  imports: [],
  templateUrl: './sources-page.component.html',
  styleUrl: './sources-page.component.scss',
})
export class SourcesPageComponent {
  protected translationService = inject(TranslationService);

  /**
   * Computed page content data with translations.
   * Reactively updates when language changes.
   */
  protected sourcesData = computed(() => {
    const t = this.translationService;
    return {
      pageTitle: t.instant('SOURCES.pageTitle'),
      lead: t.instant('SOURCES.lead'),
      iconsTitle: t.instant('SOURCES.iconsTitle'),
      iconsText: t.instant('SOURCES.iconsText'),
      flaticon: t.instant('SOURCES.flaticon'),
      svgRepo: t.instant('SOURCES.svgRepo'),
      iconPacks: t.instant('SOURCES.iconPacks'),
      licenseTitle: t.instant('SOURCES.licenseTitle'),
      licenseText: t.instant('SOURCES.licenseText'),
    };
  });
}
