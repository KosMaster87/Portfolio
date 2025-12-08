/**
 * @fileoverview Separator component.
 * @description Reusable separator component for visual division.
 * @module separator.component
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-separator',
  imports: [],
  template: `
    <div [class]="getSeparatorClasses()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './separator.component.scss',
})
export class SeparatorComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() variant: 'solid' | 'dashed' | 'dotted' = 'solid';
  @Input() spacing: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'border' | 'muted' | 'primary' = 'border';

  /**
   * Generates CSS class names for the separator component.
   * @returns {string} Space-separated CSS class names.
   */
  getSeparatorClasses(): string {
    const classes = ['separator'];

    classes.push(`separator--${this.orientation}`);
    classes.push(`separator--${this.variant}`);
    classes.push(`separator--${this.spacing}`);
    classes.push(`separator--${this.color}`);

    return classes.join(' ');
  }
}
