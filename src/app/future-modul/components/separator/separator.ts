/**
 * @fileoverview Separator Component.
 * @description A reusable separator line with gradient effect.
 * Can be customized with spacing, opacity, and color.
 * @module app/future-modul/components/separator
 */

import { Component, Input } from '@angular/core';

/**
 * Separator Component.
 * @description A reusable separator line with gradient effect.
 * Can be customized with spacing, opacity, and color.
 * @module app/future-modul/components/separator
 */
@Component({
  selector: 'app-separator',
  imports: [],
  templateUrl: './separator.html',
  styleUrl: './separator.scss',
})
export class Separator {
  /**
   * Bottom spacing from the separator (default: 1rem)
   */
  @Input() spacing: string = '1rem';

  /**
   * Opacity of the separator (default: 0.6)
   */
  @Input() opacity: number = 0.6;

  /**
   * Color of the separator (default: #ccc)
   */
  @Input() color: string = '#ccc';
}
