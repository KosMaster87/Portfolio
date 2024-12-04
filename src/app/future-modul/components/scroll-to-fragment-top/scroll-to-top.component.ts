import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollService } from './../../../shared/services/scroll/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  imports: [RouterModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
})
export class ScrollToTopComponent {
  private scrollService = inject(ScrollService);

  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }

  // scrollToTop() {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }
}
