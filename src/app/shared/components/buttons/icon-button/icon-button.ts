/**
 * @fileoverview Reusable icon button component.
 * @description Button with icon and optional text label, used for actions like "Back to Top".
 * @module shared/components/buttons/icon-button
 */

import { Component, computed, inject, input, output } from '@angular/core';

import { ThemeService } from '@core/services';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButtonComponent {
  private themeService = inject(ThemeService);
  protected isDark = computed(() => this.themeService.activeTheme() === 'dark');
  protected arrowImage = '/assets/images/vector/arrows/arrow-light.svg';
  ariaLabel = input.required<string>();
  type = input<'button' | 'submit' | 'reset'>('button');
  clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
