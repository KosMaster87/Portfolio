/**
 * @fileoverview Home page component.
 * @description Main landing page that orchestrates all home sections.
 * @module home-page.component
 */

import { Component, inject, OnInit } from '@angular/core';
import { ScrollService, SeoService } from '@core/services';
import { ScrollArrowComponent } from '../../../../shared/components/buttons/scroll-arrow/scroll-arrow.component';
import { LinearGradientComponent } from '../../../../shared/components/linear-gradient/linear-gradient.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section.component';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ScrollArrowComponent,
    LinearGradientComponent,
    AboutSectionComponent,
    ContactSectionComponent,
    HeroSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private seoService = inject(SeoService);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.seoService.updateMetadata({
      title: 'Konstantin Aksenov - Software Developer Portfolio',
      description:
        'Experienced Software Developer specializing in Angular, TypeScript, and modern web development. View my projects and get in touch.',
      keywords:
        'Software Developer, Angular Developer, TypeScript, Web Development, Portfolio, Konstantin Aksenov',
      ogTitle: 'Konstantin Aksenov - Software Developer',
      ogDescription: 'Professional portfolio showcasing modern web development projects',
      ogImage: 'https://portfolio.dev2k.org/assets/screenshots/desktop-home.png',
      ogUrl: 'https://portfolio.dev2k.org',
    });

    this.scrollService.triggerPageFlash();
  }
}
