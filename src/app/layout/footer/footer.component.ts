/**
 * @fileoverview Footer component.
 * @description Main footer with links, social media, and legal information for the portfolio application.
 * @module layout/footer
 */

import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationService, TranslationService } from '@core/services';
import { IconButtonComponent } from '@shared/components';

/**
 * Footer component.
 * Main footer with navigation links, social media links, legal information,
 * and back-to-top functionality. Uses NavigationService for centralized navigation.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterModule, IconButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected translationService = inject(TranslationService);
  private navigationService = inject(NavigationService);

  currentYear = new Date().getFullYear();

  /**
   * Computed footer content data with translations.
   * Reactively updates when language changes.
   */
  protected footerData = computed(() => {
    const t = this.translationService;
    return {
      brandDescription: t.instant('FOOTER.brandDescription'),
      navigationHeading: t.instant('FOOTER.navigationHeading'),
      legalHeading: t.instant('FOOTER.legalHeading'),
      socialHeading: t.instant('FOOTER.socialHeading'),
      copyright: t.instant('FOOTER.copyright'),
      love: t.instant('FOOTER.love'),
      and: t.instant('FOOTER.and'),
      builtWith: t.instant('FOOTER.builtWith'),
      angular: t.instant('FOOTER.angular'),
      typescript: t.instant('FOOTER.typescript'),
      scss: t.instant('FOOTER.scss'),
      backToTop: t.instant('FOOTER.backToTop'),
      backToTopAria: t.instant('FOOTER.backToTopAria'),
      home: t.instant('MENU.home'),
      about: t.instant('MENU.about'),
      projects: t.instant('MENU.projects'),
      contact: t.instant('MENU.contact'),
      imprint: t.instant('MENU.imprint'),
      privacy: t.instant('MENU.privacy'),
      sources: t.instant('MENU.sources'),
    };
  });

  socialLinks = computed(() => {
    const t = this.translationService;
    return [
      {
        name: 'GitHub',
        url: 'https://github.com/KosMaster87',
        iconPath: '/assets/images/vector/social/github.svg',
        ariaLabel: t.instant('FOOTER.githubAria'),
        hoverColor: 'github',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/konstantin-aksenov-802b88190/',
        iconPath: '/assets/images/vector/social/linkedin.svg',
        ariaLabel: t.instant('FOOTER.linkedinAria'),
        hoverColor: 'linkedin',
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/@kav87',
        iconPath: '/assets/images/vector/social/youtube.svg',
        ariaLabel: t.instant('FOOTER.youtubeAria'),
        hoverColor: 'youtube',
      },
      {
        name: 'Email',
        url: 'mailto:konstantin.aksenov@dev2k.org',
        iconPath: '/assets/images/vector/social/email.svg',
        ariaLabel: t.instant('FOOTER.emailAria'),
        hoverColor: 'email',
      },
    ];
  });

  /**
   * Gets Angular version for display in footer.
   * @returns {string} Angular version number
   */
  getAngularVersion(): string {
    return '21';
  }

  /**
   * Navigates to a section (handles both same-page and cross-page navigation).
   * Automatically navigates to home page if not already there.
   * @param {string} sectionId - The section ID to navigate to
   */
  navigateToSection(sectionId: string): void {
    this.navigationService.navigateToSection(sectionId);
  }

  /**
   * Navigates to home page.
   * Used for footer "Home" link.
   */
  navigateToHome(): void {
    this.navigationService.navigateToHome();
  }

  /**
   * Scrolls to top of current page without navigation.
   * Used for \"Back to Top\" functionality.
   */
  scrollToTop(): void {
    this.navigationService.scrollToTop();
  }

  /**
   * Navigates to a specific route and scrolls to top.
   * Used for legal pages (imprint, privacy policy).
   * @param {string} route - The route path to navigate to
   */
  navigateToRoute(route: string): void {
    this.navigationService.navigateToRoute(route);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
}
