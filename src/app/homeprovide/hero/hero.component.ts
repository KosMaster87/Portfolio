import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../future-modul/shared.module';
import { ScrollService } from './../../shared/services/scroll/scroll.service';
import { ScrollToFragmentComponent } from './../../future-modul/components/scroll-to-fragment-down/scroll-to-fragment.component';

/**
 * HeroComponent represents the hero section of the application.
 * It provides functionality to scroll to specific fragments on the page.
 *
 * **Features:**
 * - Supports smooth scrolling to a specific fragment when triggered.
 */
@Component({
  selector: 'app-hero',
  imports: [
    TranslateModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ScrollToFragmentComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  private scrollService = inject(ScrollService);

  /**
   * Scrolls to the fragment specified by the input `fragment` string.
   *
   * This method utilizes the `ScrollService` to perform a smooth scroll to the target
   * fragment, typically for navigation purposes within the page.
   *
   * @param {string} fragment - The identifier of the fragment to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
