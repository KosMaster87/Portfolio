import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'selfPage';
  private translateService = inject(TranslateService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.setDefaultLanguage();
    // this.route.fragment.subscribe((fragment: string | null) => {
    //   const element = document.getElementById(fragment ?? '');
    //   if (element) {
    //     element.scrollIntoView({ behavior: 'smooth' });
    //   }
    // });
  }

  private setDefaultLanguage() {
    this.translateService.setDefaultLang('de');
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
