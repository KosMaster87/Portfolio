import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  imports: [CommonModule],
  templateUrl: './submit-button.html',
  styleUrls: ['./submit-button.scss'],
})
export class SubmitButtonComponent {
  @Input() label = 'Send message';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}
