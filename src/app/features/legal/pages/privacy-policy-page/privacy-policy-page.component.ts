/**
 * @fileoverview Privacy policy page component.
 * @description Displays privacy policy and data protection information for the portfolio website.
 * @module features/legal/pages/privacy-policy-page
 */

import { Component, computed, inject, OnInit } from '@angular/core';
import { ScrollService, SeoService, TranslationService } from '@core/services';

@Component({
  selector: 'app-privacy-policy-page',
  imports: [],
  templateUrl: './privacy-policy-page.component.html',
  styleUrl: './privacy-policy-page.component.scss',
})
export class PrivacyPolicyPageComponent implements OnInit {
  protected translationService = inject(TranslationService);
  private seoService = inject(SeoService);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.seoService.updateMetadata({
      title: 'Privacy Policy - Konstantin Aksenov',
      description:
        'Privacy policy and data protection information for portfolio website. Learn how we handle your data.',
      keywords: 'privacy policy, data protection, GDPR, cookies, data security',
      ogTitle: 'Privacy Policy - Konstantin Aksenov',
      ogDescription: 'Privacy policy and data protection information',
      ogUrl: 'https://portfolio.dev2k.org/privacy-policy',
    });

    this.scrollService.triggerPageFlash();
  }

  /**
   * Last update date of the privacy policy.
   */
  protected lastUpdated = '2025-01-14';

  /**
   * Computed page content data with translations.
   * Reactively updates when language changes.
   */
  protected privacyData = computed(() => {
    const t = this.translationService;
    return {
      pageTitle: t.instant('PRIVACY.pageTitle'),
      lead: t.instant('PRIVACY.lead'),
      lastUpdated: t.instant('PRIVACY.lastUpdated'),
      overviewTitle: t.instant('PRIVACY.overviewTitle'),
      overviewText: t.instant('PRIVACY.overviewText'),
      dataCollectionTitle: t.instant('PRIVACY.dataCollectionTitle'),
      autoCollectedTitle: t.instant('PRIVACY.autoCollectedTitle'),
      autoCollectedLogData: t.instant('PRIVACY.autoCollectedLogData'),
      autoCollectedLogDataText: t.instant('PRIVACY.autoCollectedLogDataText'),
      autoCollectedUsageData: t.instant('PRIVACY.autoCollectedUsageData'),
      autoCollectedUsageDataText: t.instant('PRIVACY.autoCollectedUsageDataText'),
      autoCollectedDeviceInfo: t.instant('PRIVACY.autoCollectedDeviceInfo'),
      autoCollectedDeviceInfoText: t.instant('PRIVACY.autoCollectedDeviceInfoText'),
      youProvideTitle: t.instant('PRIVACY.youProvideTitle'),
      youProvideContactForms: t.instant('PRIVACY.youProvideContactForms'),
      youProvideContactFormsText: t.instant('PRIVACY.youProvideContactFormsText'),
      youProvideNewsletter: t.instant('PRIVACY.youProvideNewsletter'),
      youProvideNewsletterText: t.instant('PRIVACY.youProvideNewsletterText'),
      youProvideFeedback: t.instant('PRIVACY.youProvideFeedback'),
      youProvideFeedbackText: t.instant('PRIVACY.youProvideFeedbackText'),
      dataUsageTitle: t.instant('PRIVACY.dataUsageTitle'),
      usageSiteImprovementTitle: t.instant('PRIVACY.usageSiteImprovementTitle'),
      usageSiteImprovementText: t.instant('PRIVACY.usageSiteImprovementText'),
      usageCommunicationTitle: t.instant('PRIVACY.usageCommunicationTitle'),
      usageCommunicationText: t.instant('PRIVACY.usageCommunicationText'),
      usageSecurityTitle: t.instant('PRIVACY.usageSecurityTitle'),
      usageSecurityText: t.instant('PRIVACY.usageSecurityText'),
      usageLegalTitle: t.instant('PRIVACY.usageLegalTitle'),
      usageLegalText: t.instant('PRIVACY.usageLegalText'),
      cookiesTitle: t.instant('PRIVACY.cookiesTitle'),
      cookiesEssentialTitle: t.instant('PRIVACY.cookiesEssentialTitle'),
      cookiesEssentialText: t.instant('PRIVACY.cookiesEssentialText'),
      cookiesAnalyticsTitle: t.instant('PRIVACY.cookiesAnalyticsTitle'),
      cookiesAnalyticsText: t.instant('PRIVACY.cookiesAnalyticsText'),
      cookiesPreferenceTitle: t.instant('PRIVACY.cookiesPreferenceTitle'),
      cookiesPreferenceText: t.instant('PRIVACY.cookiesPreferenceText'),
      dataSharingTitle: t.instant('PRIVACY.dataSharingTitle'),
      dataSharingIntro: t.instant('PRIVACY.dataSharingIntro'),
      dataSharingText: t.instant('PRIVACY.dataSharingText'),
      dataSharingConsent: t.instant('PRIVACY.dataSharingConsent'),
      dataSharingLegal: t.instant('PRIVACY.dataSharingLegal'),
      dataSharingRights: t.instant('PRIVACY.dataSharingRights'),
      dataSharingProviders: t.instant('PRIVACY.dataSharingProviders'),
      yourRightsTitle: t.instant('PRIVACY.yourRightsTitle'),
      rightsAccessTitle: t.instant('PRIVACY.rightsAccessTitle'),
      rightsAccessText: t.instant('PRIVACY.rightsAccessText'),
      rightsCorrectionTitle: t.instant('PRIVACY.rightsCorrectionTitle'),
      rightsCorrectionText: t.instant('PRIVACY.rightsCorrectionText'),
      rightsDeletionTitle: t.instant('PRIVACY.rightsDeletionTitle'),
      rightsDeletionText: t.instant('PRIVACY.rightsDeletionText'),
      rightsPortabilityTitle: t.instant('PRIVACY.rightsPortabilityTitle'),
      rightsPortabilityText: t.instant('PRIVACY.rightsPortabilityText'),
      securityTitle: t.instant('PRIVACY.securityTitle'),
      securityIntro: t.instant('PRIVACY.securityIntro'),
      securitySSL: t.instant('PRIVACY.securitySSL'),
      securityHosting: t.instant('PRIVACY.securityHosting'),
      securityUpdates: t.instant('PRIVACY.securityUpdates'),
      securityAccess: t.instant('PRIVACY.securityAccess'),
      contactPrivacyTitle: t.instant('PRIVACY.contactPrivacyTitle'),
      contactPrivacyText: t.instant('PRIVACY.contactPrivacyText'),
      contactPrivacyEmail: t.instant('PRIVACY.contactPrivacyEmail'),
      contactPrivacyEmailValue: t.instant('PRIVACY.contactPrivacyEmailValue'),
      contactPrivacyForm: t.instant('PRIVACY.contactPrivacyForm'),
      contactPrivacyFormText: t.instant('PRIVACY.contactPrivacyFormText'),
      contactPrivacyMail: t.instant('PRIVACY.contactPrivacyMail'),
      contactPrivacyMailValue: t.instant('PRIVACY.contactPrivacyMailValue'),
      policyUpdatesTitle: t.instant('PRIVACY.policyUpdatesTitle'),
      policyUpdatesText: t.instant('PRIVACY.policyUpdatesText'),
    };
  });
}
