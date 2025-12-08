import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  imports: [],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
})
export class CtaButtonComponent {
  btnContentText = input.required<string>();
  clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
