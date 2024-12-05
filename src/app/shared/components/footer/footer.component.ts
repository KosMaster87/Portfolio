import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from './../../../future-modul/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll/scroll.service';

/**
 * FooterComponent displays the footer section of the application.
 *
 * It includes methods for scrolling to a specific fragment on the page
 * and navigating to the home page.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, SharedModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    './../../../shared/styles/iconHover-social.scss',
  ],
})
export class FooterComponent {
  private router: Router = inject(Router);
  private scrollService = inject(ScrollService);

  /**
   * Scrolls to the specified fragment on the page.
   *
   * @param {string} fragment - The ID of the fragment to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }

  /**
   * Navigates to the home page and scrolls to the specified section after a slight delay.
   *
   * This method uses the router to navigate to the home page and after 100ms,
   * it scrolls to the section with the ID 'landingPage_firstSector'.
   */
  navigateToHome(): void {
    this.router.navigate(['/home']);

    setTimeout(() => {
      this.scrollToFragment('landingPage_firstSector');
    }, 100);
  }
}
