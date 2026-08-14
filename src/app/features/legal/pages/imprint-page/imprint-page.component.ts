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
      ogUrl: 'https://portfolio.dev2ksoftware.com/imprint',
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
      website: t.instant('IMPRINT.website'),
      technicalInfoTitle: t.instant('IMPRINT.technicalInfoTitle'),
      technicalInfoText: t.instant('IMPRINT.technicalInfoText'),
      company: t.instant('IMPRINT.company'),
      soleProprietor: t.instant('IMPRINT.soleProprietor'),
      name: t.instant('IMPRINT.name'),
      city: t.instant('IMPRINT.city'),
      emailValue: t.instant('IMPRINT.emailValue'),
      websiteValue: t.instant('IMPRINT.websiteValue'),
    };
  });
}
