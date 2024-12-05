import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../future-modul/shared.module';
import { ScrollService } from './../../shared/services/scroll/scroll.service';
import { ScrollToFragmentOptionalComponent } from './../../future-modul/components/scroll-to-fragment-optional/scroll-to-fragment-optional.component';

/**
 * SkillsComponent represents the skills section of the application.
 *
 * This component manages the skills section and provides functionality
 * for scrolling to specific fragments within the page. It also contains
 * a rotating arrow functionality for visual effects.
 */
@Component({
  selector: 'app-skills',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    ScrollToFragmentOptionalComponent,
  ],
  templateUrl: './skills.component.html',

  styleUrls: [
    './skills.component.scss',
    './../../shared/styles/highlighting.scss',
    './../../shared/styles/iconHover-skills.scss',
  ],
})
export class SkillsComponent {
  rotatingArrowIsLeft = true;
  private scrollService = inject(ScrollService);

  /**
   * Scrolls to the specified fragment on the page.
   *
   * @param {string} fragment - The ID of the fragment to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
