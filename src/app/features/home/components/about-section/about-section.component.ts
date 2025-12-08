/**
 * @fileoverview About section component.
 * @description Personal introduction section with portrait, description text, and CTA button.
 * Features: i18n support, responsive layout, decorative border animation.
 * @module features/home/components/about-section
 */

import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScrollService, ThemeService, TranslationService } from '../../../../core/services';
import { CtaButtonComponent, DecorativeBorderComponent } from '../../../../shared/components';

@Component({
  selector: 'app-about-section',
  imports: [RouterModule, CtaButtonComponent, DecorativeBorderComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
})
export class AboutSectionComponent {
  protected translationService = inject(TranslationService);
  private scrollService = inject(ScrollService);
  private themeService = inject(ThemeService);

  /**
   * Computed about section content data with translations.
   * Reactively updates when language changes.
   * @returns Object containing all about section text content
   */
  protected aboutData = computed(() => {
    const t = this.translationService;
    return {
      heading: t.instant('ABOUT.heading'),
      paragraph1: t.instant('ABOUT.paragraph1'),
      paragraph2: t.instant('ABOUT.paragraph2'),
      ctaText: t.instant('ABOUT.ctaButton'),
    };
  });

  /**
   * Border color based on theme
   * Light theme: black, Dark theme: primary-dark
   */
  protected borderColor = computed(() =>
    this.themeService.activeTheme() === 'dark' ? 'var(--color-primary)' : '#000000'
  );

  /**
   * Scrolls to a specific section.
   */
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToFragment(sectionId);
  }
}
