/**
 * @fileoverview Navigation Button Component
 * @description Navigation button for 404 page with SVG icon support
 * @module shared/components/buttons/nav-button
 */

import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ThemeService } from '../../../../core/services/theme.service';

export type NavIconType = 'home' | 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'back';

@Component({
  selector: 'app-nav-button',
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  private themeService = inject(ThemeService);
  private navigationService = inject(NavigationService);

  label = input.required<string>();
  icon = input.required<NavIconType>();
  routerLink = input.required<string | string[]>();
  fragment = input<string>();

  protected iconPath = computed(() => {
    return `/assets/images/vector/menu/${this.icon()}.svg`;
  });

  protected isDark = computed(() => this.themeService.activeTheme() === 'dark');

  /**
   * Navigate on click
   * Uses routerLink and fragment inputs to determine navigation
   */
  navigate(): void {
    const link = this.routerLink();
    const frag = this.fragment();

    if (frag) {
      const route = Array.isArray(link) ? link[0] : link;
      this.navigationService.navigateToSection(frag, route);
    } else {
      this.navigationService.navigateToRoute(link);
    }
  }
}
