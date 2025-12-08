/**
 * @fileoverview Notification component for displaying success/error messages.
 * @description Toast-style notification that slides in from the right with auto-dismiss and progress bar.
 * @module shared/components/notification
 */

import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class NotificationComponent {
  show = input.required<boolean>();
  message = input.required<string>();
  type = input<'success' | 'error'>('success');
  duration = input<number>(5000);
  actionText = input<string>('');
  closed = output<void>();
  action = output<void>();

  private timeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    this.setupAutoDismiss();
  }

  /**
   * Setup auto-dismiss effect
   */
  private setupAutoDismiss(): void {
    effect(() => {
      if (this.show()) {
        this.startAutoDismiss();
      } else {
        this.clearAutoDismiss();
      }
    });
  }

  /**
   * Start auto-dismiss timer
   */
  private startAutoDismiss(): void {
    this.clearAutoDismiss();
    this.timeoutId = setTimeout(() => {
      this.onClose();
    }, this.duration());
  }

  /**
   * Clear auto-dismiss timer
   */
  private clearAutoDismiss(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  /**
   * Handle notification close
   */
  onClose(): void {
    this.clearAutoDismiss();
    this.closed.emit();
  }

  /**
   * Handle action button click
   */
  onAction(): void {
    this.clearAutoDismiss();
    this.action.emit();
  }
}
