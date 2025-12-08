/**
 * @fileoverview Skills section component.
 * @description Technical skills and competencies showcase.
 * @module skills-section.component
 */

import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services';
import { IconHoverDirective } from '../../../../shared/directives/icon-hover.directive';

export interface SkillItem {
  name: string;
  icon: string;
  cssClass: string;
}

@Component({
  selector: 'app-skills-section',
  imports: [IconHoverDirective],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
})
export class SkillsSectionComponent {
  protected translationService = inject(TranslationService);
  protected heading = computed(() => this.translationService.instant('SECTIONS.skills'));

  protected skills: SkillItem[] = [
    { name: 'Angular', icon: 'icon-ng.svg', cssClass: 'angular' },
    { name: 'Firebase', icon: 'icon-fb.svg', cssClass: 'firebase' },
    { name: 'TypeScript', icon: 'icon-ts.svg', cssClass: 'typeScript' },
    { name: 'JavaScript', icon: 'icon-js.svg', cssClass: 'javaScript' },
    { name: 'Rest-Api', icon: 'icon-api.svg', cssClass: 'rest' },
    { name: 'HTML', icon: 'icon-html.svg', cssClass: 'html' },
    { name: 'CSS', icon: 'icon-css.svg', cssClass: 'css' },
    { name: 'Node.js', icon: 'icon-nodejs.svg', cssClass: 'nodejs' },
    { name: 'Express.js', icon: 'icon-expressjs-dark.svg', cssClass: 'expressjs' },
    { name: 'Docker', icon: 'icon-docker.svg', cssClass: 'docker' },
    { name: 'Linux', icon: 'icon-linux.svg', cssClass: 'linux' },
    { name: 'Bash', icon: 'icon-bash.svg', cssClass: 'bash' },
    { name: 'Git', icon: 'icon-git.svg', cssClass: 'git' },
    { name: 'GitHub', icon: 'icon-github-dark.svg', cssClass: 'github' },
    { name: 'GitHub Copilot', icon: 'icon-github-copilot.svg', cssClass: 'githubcopilot' },
    { name: 'PHP', icon: 'icon-php.svg', cssClass: 'php' },
    { name: 'Scrum', icon: 'icon-scrum.svg', cssClass: 'scrum' },
    { name: 'WordPress', icon: 'icon-wp.svg', cssClass: 'wordPress' },
  ];
}
