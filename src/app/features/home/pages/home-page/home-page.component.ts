/**
 * @fileoverview Home page component.
 * @description Main landing page that orchestrates all home sections.
 * @module home-page.component
 */

import { Component } from '@angular/core';
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
export class HomePageComponent {}
