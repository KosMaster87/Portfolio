import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollService } from './../../../shared/services/scroll/scroll.service';

/**
 * Component to provide functionality for scrolling to a specific fragment of the page.
 *
 * This component listens for interactions and uses the `ScrollService` to scroll to the
 * desired fragment identified by a fragment identifier.
 *
 * When this component is triggered, it will scroll the page to the provided fragment.
 */
@Component({
  selector: 'app-scroll-to-top',
  imports: [RouterModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
})
export class ScrollToTopComponent {
  private scrollService = inject(ScrollService);

  /**
   * Triggers scrolling to a fragment on the page.
   *
   * This method is used to scroll the page to a specific fragment identified by the
   * `fragment` parameter. It calls the `scrollToFragment` method of `ScrollService`.
   *
   * @param {string} fragment The identifier of the fragment to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
