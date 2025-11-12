/**
 * @fileoverview About component.
 * @description This component displays information about the application or organization.
 * It includes navigation features to scroll to specific sections of the page.
 * @module app/homeprovide/about
 */

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../future-modul/shared.module';
import { ScrollService } from './../../shared/services/scroll/scroll.service';
import { ScrollToFragmentOptionalComponent } from './../../future-modul/components/scroll-to-fragment-optional/scroll-to-fragment-optional.component';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    ScrollToFragmentOptionalComponent,
  ],
  templateUrl: './about.component.html',
  styleUrls: [
    './about.component.scss',
    './../../shared/styles/highlighting.scss',
  ],
})
export class AboutComponent {
  rotatingArrowIsLeft = false;
  private scrollService = inject(ScrollService);

  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
