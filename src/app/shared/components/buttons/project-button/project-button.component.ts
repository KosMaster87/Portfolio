/**
 * @fileoverview Project Button component
 * @description Button component for project cards with static sizing
 * @module shared/components/buttons/project-button
 */

import { Component, input, output } from '@angular/core';

/**
 * Project button component
 */
@Component({
  selector: 'app-project-button',
  template: `
    <button class="project-button" type="button" (click)="handleClick()">
      {{ label() }}
    </button>
  `,
  styleUrl: './project-button.component.scss',
})
export class ProjectButtonComponent {
  label = input.required<string>();
  click = output<void>();

  /**
   * Handle button click
   */
  protected handleClick(): void {
    this.click.emit();
  }
}
