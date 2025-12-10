import { Component, input, output, inject } from '@angular/core';
import { SmoothScrollService } from '../../../../core/services';

@Component({
  selector: 'app-cta-button',
  imports: [],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
})
export class CtaButtonComponent {
  private smoothScrollService = inject(SmoothScrollService);

  btnContentText = input.required<string>();
  clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }

  onFocus(event: FocusEvent): void {
    const button = event.target as HTMLElement;
    const section = button.closest('section') as HTMLElement;

    if (section) {
      this.smoothScrollService.scrollElementToTop(section, 1000);
    }
  }
}
