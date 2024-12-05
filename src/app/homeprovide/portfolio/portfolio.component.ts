import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../future-modul/shared.module';
import { ProjectComponent } from './project/project/project.component';
import { ScrollService } from './../../shared/services/scroll/scroll.service';
import { ScrollToFragmentOptionalComponent } from './../../future-modul/components/scroll-to-fragment-optional/scroll-to-fragment-optional.component';

/**
 * PortfolioComponent represents the portfolio section of the application.
 *
 * This component displays the portfolio of projects and includes functionality
 * to scroll to specific fragments on the page. It also provides a visual effect
 * with a rotating arrow.
 */
@Component({
  selector: 'app-portfolio',
  imports: [
    ProjectComponent,
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule,
    ScrollToFragmentOptionalComponent,
  ],
  templateUrl: './portfolio.component.html',

  styleUrls: [
    './portfolio.component.scss',
    './../../shared/styles/highlighting.scss',
  ],
})
export class PortfolioComponent {
  rotatingArrowIsLeft = false;
  private scrollService = inject(ScrollService);

  /**
   * Scrolls the page to a specific fragment.
   *
   * @param {string} fragment - The ID of the fragment to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
