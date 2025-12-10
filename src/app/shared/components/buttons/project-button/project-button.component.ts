/**
 * @fileoverview Project Button component
 * @description Button component for project cards with static sizing
 * @module shared/components/buttons/project-button
 */

import { Component, input, output, inject } from '@angular/core';
import { SmoothScrollService } from '../../../../core/services';

/**
 * Project button component
 */
@Component({
  selector: 'app-project-button',
  template: `
    <button
      class="project-button"
      type="button"
      (click)="handleClick()"
      (focus)="handleFocus($event)"
    >
      {{ label() }}
    </button>
  `,
  styleUrl: './project-button.component.scss',
})
export class ProjectButtonComponent {
  private smoothScrollService = inject(SmoothScrollService);

  label = input.required<string>();
  click = output<void>();

  /**
   * Handle button click
   */
  protected handleClick(): void {
    this.click.emit();
  }

  /**
   * Handle button focus - scroll parent card into view
   */
  protected handleFocus(event: FocusEvent): void {
    const button = event.target as HTMLElement;
    const card = button.closest('.project-card') as HTMLElement;

    if (card) {
      this.smoothScrollService.scrollElementToCenter(card, 1000);
    }
  }
}
