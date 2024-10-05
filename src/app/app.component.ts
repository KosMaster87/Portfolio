import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutComponent } from './landing-page/about/about.component';
import { SkillsComponent } from './landing-page/skills/skills.component';
import { PortfolioComponent } from './landing-page/portfolio/portfolio.component';
import { CommentsComponent } from './landing-page/comments/comments.component';
import { ContactComponent } from './landing-page/contact/contact.component';

// Shared component
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Pages
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ImprintComponent } from './pages/imprint/imprint.component';

// Services

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

    // Components
    LandingPageComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    CommentsComponent,
    ContactComponent,

    // Shared component
    HeaderComponent,
    FooterComponent,

    // Pages
    PrivacyPolicyComponent,
    ImprintComponent,

    // Services
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
}
