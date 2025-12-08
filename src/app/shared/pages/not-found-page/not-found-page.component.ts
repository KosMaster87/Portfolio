/**
 * @fileoverview Not found page component (404).
 * @description Displays a user-friendly 404 error page when users navigate to non-existent routes.
 * @module shared/pages/not-found-page
 */

import { Location } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { NavButtonComponent } from '../../components/buttons/nav-button/nav-button.component';

@Component({
  selector: 'app-not-found-page',
  imports: [NavButtonComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  private location = inject(Location);
  protected translationService = inject(TranslationService);

  /**
   * Computed page content data with translations.
   * Reactively updates when language changes.
   */
  protected pageData = computed(() => {
    const t = this.translationService;
    return {
      errorNumber: '404',
      title: t.instant('NOT_FOUND.title'),
      description: t.instant('NOT_FOUND.description'),
      backToHome: t.instant('NOT_FOUND.backToHome'),
      maybeYouLookingFor: t.instant('NOT_FOUND.maybeYouLookingFor'),
      heroLabel: t.instant('NOT_FOUND.heroLabel'),
      aboutLabel: t.instant('NOT_FOUND.aboutLabel'),
      skillsLabel: t.instant('NOT_FOUND.skillsLabel'),
      projectsLabel: t.instant('NOT_FOUND.projectsLabel'),
      contactLabel: t.instant('NOT_FOUND.contactLabel'),
    };
  });

  /**
   * Navigate back to the previous page
   */
  goBack(): void {
    this.location.back();
  }
}
