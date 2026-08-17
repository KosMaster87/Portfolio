/**
 * @fileoverview Toast-style notification component
 * @description Slides in, auto-dismisses with a progress bar unless `persist` is set (used
 * for cases that require an explicit user action, like an unrecoverable service worker
 * state). Self-contained styling via CSS custom properties with sane fallbacks - picks up a
 * consuming app's `scss-library` toast tokens automatically where present.
 */

import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'dev2k-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  show = input.required<boolean>();
  message = input.required<string>();
  type = input<'success' | 'error'>('success');
  duration = input<number>(5000);
  actionText = input<string>('');
  /** Suppresses the auto-dismiss timer - the visitor must act explicitly. */
  persist = input<boolean>(false);
  closed = output<void>();
  action = output<void>();

  private timeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    this.setupAutoDismiss();
  }

  private setupAutoDismiss(): void {
    effect(() => {
      if (this.show() && !this.persist()) {
        this.startAutoDismiss();
      } else {
        this.clearAutoDismiss();
      }
    });
  }

  private startAutoDismiss(): void {
    this.clearAutoDismiss();
    this.timeoutId = setTimeout(() => {
      this.onClose();
    }, this.duration());
  }

  private clearAutoDismiss(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  onClose(): void {
    this.clearAutoDismiss();
    this.closed.emit();
  }

  onAction(): void {
    this.clearAutoDismiss();
    this.action.emit();
  }
}
