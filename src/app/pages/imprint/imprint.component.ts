import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from './../../future-modul/shared.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  imports: [SharedModule, RouterModule, TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrls: [
    './imprint.component.scss',
    './../../shared/styles/highlighting.scss',
  ],
})
export class ImprintComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      const element = document.getElementById(fragment || '');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
