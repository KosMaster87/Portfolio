/**
 * @fileoverview Hero section component.
 * @description Main hero/landing section with introduction and call-to-action.
 * @module hero-section.component
 */

import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollService, TranslationService } from '../../../../core/services';
import { CtaButtonComponent } from '../../../../shared/components';

@Component({
  selector: 'app-hero-section',
  imports: [RouterModule, CtaButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  private scrollService = inject(ScrollService);
  protected translationService = inject(TranslationService);

  /**
   * Computed hero content data with translations.
   * Reactively updates when language changes.
   * @returns Object containing all hero section text content
   */
  protected heroData = computed(() => {
    const t = this.translationService;
    return {
      name: t.instant('HERO.name'),
      title: t.instant('HERO.title'),
      titleDeveloper: t.instant('HERO.titleDeveloper'),
      description: t.instant('HERO.description'),
      ctaText: t.instant('HERO.ctaButton'),
    };
  });

  /**
   * Scrolls to a specific section.
   */
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToFragment(sectionId);
  }
}
