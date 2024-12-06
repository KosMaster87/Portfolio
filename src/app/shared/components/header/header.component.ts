import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from './../../services/scroll/scroll.service';
import { HamburgerMenuBtnComponent } from './../../../future-modul/components/hamburger-menu-btn/hamburger-menu-btn.component';

/**
 * The HeaderComponent manages the header section of the application.
 * It provides functionalities for language switching, scrolling, and navigating to specific sections.
 */
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
  inOnImprint: boolean = false;

  private scrollService = inject(ScrollService);
  private router: Router = inject(Router);

  /**
   * Subscribes to router events to determine if the user is on the home page.
   * Used to toggle the visibility of the "scroll to top" button.
   */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const basePath = event.urlAfterRedirects.split('#')[0].split('?')[0];
        this.isOnHomePage = basePath === '/' || basePath === '/home';
        this.inOnImprint = basePath === '/imprint';
      }
    });
  }

  /**
   * Emits an event to change the application language.
   * @param {string} lang - The new language to set (e.g., 'en', 'de').
   */
  translateText(lang: string) {
    this.languageChanged.emit(lang);
  }

  /**
   * Changes the currently selected language.
   * @param {string} lang - The new language to set (e.g., 'en', 'de').
   */
  changeLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  /**
   * Scrolls to the specified fragment within the current page.
   * @param {string} fragment - The ID of the HTML element to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }

  /**
   * Navigates to the home page and scrolls to a specific fragment after navigation.
   */
  navigateToHome(): void {
    this.router.navigate(['/home']);

    setTimeout(() => {
      this.scrollToFragment('landingPage_firstSector');
    }, 100);
  }
}
