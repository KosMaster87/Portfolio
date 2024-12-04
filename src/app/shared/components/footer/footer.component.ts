import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from './../../../future-modul/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll/scroll.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, SharedModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    './../../../shared/styles/iconHover-social.scss',
  ],
})
export class FooterComponent {
  private router: Router = inject(Router);
  private scrollService = inject(ScrollService);

  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);

    setTimeout(() => {
      this.scrollToFragment('landingPage_firstSector');
    }, 100);
  }
}
