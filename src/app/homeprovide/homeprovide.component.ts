import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { HeroComponent } from './hero/hero.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-homeprovide',
  imports: [
    AboutComponent,
    HeroComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent,
  ],
  templateUrl: './homeprovide.component.html',
  styleUrl: './homeprovide.component.scss',
})
export class HomeprovideComponent {}
