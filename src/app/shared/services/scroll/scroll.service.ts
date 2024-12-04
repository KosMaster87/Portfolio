import { ViewportScroller } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  scrollToFragment(fragment: string): void {
    this.router.navigate([], {
      fragment,
      queryParamsHandling: 'preserve',
    });

    this.viewportScroller.scrollToAnchor(fragment);
  }
}
