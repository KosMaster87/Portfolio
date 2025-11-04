import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * The root component of the application.
 * It serves as the container for all application-level components and functionality.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly title = signal('selfPage');
  private translateService = inject(TranslateService);
  private route = inject(ActivatedRoute);

  /**
   * Initializes the root component and sets the default language of the application.
   */
  ngOnInit() {
    this.setDefaultLanguage();
  }

  /**
   * Sets the default language for the application to German (`'de'`).
   * This is called during the initialization of the component.
   */
  private setDefaultLanguage() {
    this.translateService.setDefaultLang('de');
  }

  /**
   * Changes the current language of the application.
   * @param {string} lang - The language to switch to (e.g., 'en', 'de').
   */
  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
