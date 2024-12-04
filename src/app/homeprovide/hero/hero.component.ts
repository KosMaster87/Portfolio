import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../future-modul/shared.module';
import { ScrollService } from './../../shared/services/scroll/scroll.service';
import { ScrollToFragmentComponent } from './../../future-modul/components/scroll-to-fragment-down/scroll-to-fragment.component';

@Component({
  selector: 'app-hero',
  imports: [
    TranslateModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ScrollToFragmentComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  private scrollService = inject(ScrollService);

  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
