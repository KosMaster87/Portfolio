/**
 * @fileoverview Footer component.
 * @description Main footer with links, social media, and legal information for the portfolio application.
 * @module layout/footer
 */

import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationService, TranslationService } from '@core/services';
import { IconButtonComponent } from '@shared/components';

/**
 * BeforeInstallPromptEvent interface for PWA installation
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

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
export class FooterComponent implements OnInit, OnDestroy {
  protected translationService = inject(TranslationService);
  private navigationService = inject(NavigationService);
  currentYear = new Date().getFullYear();

  protected deferredPrompt: WritableSignal<BeforeInstallPromptEvent | null> = signal(null);
  protected installAvailable = computed(() => !!this.deferredPrompt());
  private beforeInstallHandler: ((e: Event) => void) | null = null;

  /**
   * Navigation menu items from NavigationService
   */
  protected get menuItems() {
    return this.navigationService.menuItems;
  }

  /**
   * Computed footer content data with translations.
   * Reactively updates when language changes.
   */
  protected footerData = computed(() => {
    const t = this.translationService;
    return {
      brandDescription: t.instant('FOOTER.brandDescription'),
      navigationHeading: t.instant('FOOTER.navigationHeading'),
      featuresHeading: t.instant('FOOTER.featuresHeading'),
      legalHeading: t.instant('FOOTER.legalHeading'),
      socialHeading: t.instant('FOOTER.socialHeading'),
      copyright: t.instant('FOOTER.copyright'),
      love: t.instant('FOOTER.love'),
      and: t.instant('FOOTER.and'),
      builtWith: t.instant('FOOTER.builtWith'),
      angular: t.instant('FOOTER.angular'),
      typescript: t.instant('FOOTER.typescript'),
      scss: t.instant('FOOTER.scss'),
      install: t.instant('FOOTER.install'),
      backToTop: t.instant('FOOTER.backToTop'),
      backToTopAria: t.instant('FOOTER.backToTopAria'),
      home: t.instant('MENU.home'),
      hero: t.instant('MENU.hero'),
      about: t.instant('MENU.about'),
      skills: t.instant('MENU.skills'),
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
    this.navigationService.navigateToHeader();
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

  /**
   * Lifecycle hook that runs after component initialization.
   * Registers a global event listener to capture the browser's `beforeinstallprompt` event,
   * which is fired when the PWA installation criteria are met. The event is stored to allow
   * manual triggering of the installation prompt via user interaction.
   */
  ngOnInit(): void {
    if (typeof window !== 'undefined' && 'addEventListener' in window) {
      this.beforeInstallHandler = (e: Event) => {
        e.preventDefault();
        this.deferredPrompt.set(e as BeforeInstallPromptEvent);
      };
      window.addEventListener('beforeinstallprompt', this.beforeInstallHandler as EventListener);
    }
  }

  /**
   * Lifecycle hook that runs when component is being destroyed.
   * Removes the `beforeinstallprompt` event listener to prevent memory leaks
   * and cleans up the stored handler reference.
   */
  ngOnDestroy(): void {
    if (this.beforeInstallHandler && typeof window !== 'undefined') {
      window.removeEventListener('beforeinstallprompt', this.beforeInstallHandler as EventListener);
      this.beforeInstallHandler = null;
    }
  }

  /**
   * Triggers the PWA installation prompt.
   * Invokes the stored `beforeinstallprompt` event's `prompt()` method to display
   * the browser's native installation dialog. After the user responds, the deferred
   * prompt is cleared regardless of the outcome (accepted or dismissed).
   * Does nothing if no prompt event is available.
   */
  installPWA(): void {
    const e = this.deferredPrompt();
    if (!e) return;
    e.prompt();
    e.userChoice.then((choice) => {
      this.deferredPrompt.set(null);
    });
  }

  /**
   * Gets translated text for a translation key.
   * @param {string} key - Translation key (e.g., 'MENU.home')
   * @returns {string} Translated text in current language
   */
  translate(key: string): string {
    return this.translationService.instant(key);
  }

  /**
   * Handles space key press on links to trigger click.
   * @param event - Keyboard event
   */
  handleSpaceKey(event: Event): void {
    (event.target as HTMLElement).click();
  }
}
