/**
 * @fileoverview Sources page component.
 * @description Displays attribution for icons, graphics, and other visual resources used on the website.
 * @module features/legal/pages/sources-page
 */

import { Component, computed, inject, OnInit } from '@angular/core';
import { ScrollService, SeoService, TranslationService } from '@core/services';

@Component({
  selector: 'app-sources-page',
  imports: [],
  templateUrl: './sources-page.component.html',
  styleUrl: './sources-page.component.scss',
})
export class SourcesPageComponent implements OnInit {
  protected translationService = inject(TranslationService);
  private seoService = inject(SeoService);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.seoService.updateMetadata({
      title: 'Sources & Attributions - Konstantin Aksenov',
      description:
        'Attribution and credits for icons, graphics, and resources used in this portfolio website.',
      keywords: 'sources, attributions, credits, icons, graphics, licenses',
      ogTitle: 'Sources & Attributions',
      ogDescription: 'Credits for visual resources used on this website',
      ogUrl: 'https://portfolio.dev2k.org/sources',
    });

    this.scrollService.triggerPageFlash();
  }

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

  /**
   * Handles space key press on links to trigger click.
   * @param event - Keyboard event
   */
  protected handleSpaceKey(event: Event): void {
    (event.target as HTMLElement).click();
  }
}
