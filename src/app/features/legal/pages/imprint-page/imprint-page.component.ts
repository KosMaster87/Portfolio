/**
 * @fileoverview Imprint page component.
 * @description Displays legal information and impressum for the portfolio website.
 * @module features/legal/pages/imprint-page
 */

import { Component, computed, inject, OnInit } from '@angular/core';
import { ScrollService, SeoService, TranslationService } from '@core/services';

@Component({
  selector: 'app-imprint-page',
  imports: [],
  templateUrl: './imprint-page.component.html',
  styleUrl: './imprint-page.component.scss',
})
export class ImprintPageComponent implements OnInit {
  protected translationService = inject(TranslationService);
  private seoService = inject(SeoService);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.seoService.updateMetadata({
      title: 'Impressum - Konstantin Aksenov',
      description:
        "Legal information and contact details for Konstantin Aksenov's portfolio website.",
      ogTitle: 'Impressum - Konstantin Aksenov',
      ogUrl: 'https://portfolio.dev2k.org/imprint',
    });

    this.scrollService.triggerPageFlash();
  }

  /**
   * Computed page content data with translations.
   * Reactively updates when language changes.
   */
  protected imprintData = computed(() => {
    const t = this.translationService;
    return {
      pageTitle: t.instant('IMPRINT.pageTitle'),
      lead: t.instant('IMPRINT.lead'),
      contactInfoTitle: t.instant('IMPRINT.contactInfoTitle'),
      responsibleForContent: t.instant('IMPRINT.responsibleForContent'),
      contactTitle: t.instant('IMPRINT.contactTitle'),
      email: t.instant('IMPRINT.email'),
      phone: t.instant('IMPRINT.phone'),
      website: t.instant('IMPRINT.website'),
      disclaimerTitle: t.instant('IMPRINT.disclaimerTitle'),
      liabilityForContentTitle: t.instant('IMPRINT.liabilityForContentTitle'),
      liabilityForContentText: t.instant('IMPRINT.liabilityForContentText'),
      liabilityForLinksTitle: t.instant('IMPRINT.liabilityForLinksTitle'),
      liabilityForLinksText: t.instant('IMPRINT.liabilityForLinksText'),
      copyrightTitle: t.instant('IMPRINT.copyrightTitle'),
      copyrightText: t.instant('IMPRINT.copyrightText'),
      technicalInfoTitle: t.instant('IMPRINT.technicalInfoTitle'),
      technicalInfoText: t.instant('IMPRINT.technicalInfoText'),
      name: t.instant('IMPRINT.name'),
      street: t.instant('IMPRINT.street'),
      city: t.instant('IMPRINT.city'),
      country: t.instant('IMPRINT.country'),
      emailValue: t.instant('IMPRINT.emailValue'),
      phoneValue: t.instant('IMPRINT.phoneValue'),
      websiteValue: t.instant('IMPRINT.websiteValue'),
    };
  });
}
