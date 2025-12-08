/**
 * @fileoverview Imprint page component.
 * @description Displays legal information and impressum for the portfolio website.
 * @module features/legal/pages/imprint-page
 */

import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-imprint-page',
  imports: [],
  templateUrl: './imprint-page.component.html',
  styleUrl: './imprint-page.component.scss',
})
export class ImprintPageComponent {
  protected translationService = inject(TranslationService);

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
