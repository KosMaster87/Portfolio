/**
 * @fileoverview Projects Section component
 * @description Portfolio projects showcase with animations
 * @module features/home/components/projects-section
 */

import { Component, computed, inject } from '@angular/core';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { SeparatorComponent } from '../../../../shared/components/separator/separator.component';
import { ProjectCardComponent } from '../../../projects/components/project-card/project-card.component';

@Component({
  selector: 'app-projects-section',
  imports: [ProjectCardComponent, SeparatorComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
})
export class ProjectsSectionComponent {
  private portfolioData = inject(PortfolioDataService);
  protected translationService = inject(TranslationService);

  protected projects = computed(() => this.portfolioData.getProjects());
  protected projectCount = computed(() => this.portfolioData.getProjectCount());
}
