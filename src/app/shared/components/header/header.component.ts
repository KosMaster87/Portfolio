import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from './../../services/scroll/scroll.service';
import { HamburgerMenuBtnComponent } from './../../../future-modul/components/hamburger-menu-btn/hamburger-menu-btn.component';

@Component({
  selector: 'app-header',
  imports: [HamburgerMenuBtnComponent],
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
    './../../../shared/styles/iconHover-lang.scss',
  ],
})
export class HeaderComponent {
  @Output() languageChanged = new EventEmitter<string>();
  currentLanguage: string = 'de';
  isOnHomePage: boolean = false;

  private scrollService = inject(ScrollService);
  private router: Router = inject(Router);

  /**
   * Für das ausblenden des arrow btn to TOP
   */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const basePath = event.urlAfterRedirects.split('#')[0].split('?')[0];
        this.isOnHomePage = basePath === '/' || basePath === '/home';
      }
    });
  }

  translateText(lang: string) {
    this.languageChanged.emit(lang);
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
  }

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
