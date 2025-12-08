/**
 * @fileoverview Decorative Border component
 * @description Decorative border overlay for images with hover effects. Used for portrait frames and other decorative elements
 * @module shared/components/decorative-border
 */

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-decorative-border',
  imports: [],
  templateUrl: './decorative-border.component.html',
  styleUrl: './decorative-border.component.scss',
})
export class DecorativeBorderComponent {
  borderWidth = input.required<number>();
  borderRadius = input.required<string>();
  aspectRatio = input.required<string>();
  borderColor = input.required<string>();
  initialOffset = input.required<{ x: number; y: number }>();
  hoverOffset = input.required<{ x: number; y: number }>();
}
