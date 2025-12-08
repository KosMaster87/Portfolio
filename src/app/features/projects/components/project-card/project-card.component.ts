/**
 * @fileoverview Project Card component
 * @description Individual project display with animations and hover effects
 * @module features/projects/components/project-card
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Project, getGitHubLinks } from '../../../../core/models/project.model';
import { ThemeService, TranslationService } from '../../../../core/services';
import { ProjectButtonComponent } from '../../../../shared/components/buttons/project-button/project-button.component';
import { DecorativeBorderComponent } from '../../../../shared/components/decorative-border/decorative-border.component';

/**
 * Project card component with animations
 */
@Component({
  selector: 'app-project-card',
  imports: [DecorativeBorderComponent, ProjectButtonComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  protected translationService = inject(TranslationService);
  private themeService = inject(ThemeService);

  project = input.required<Project>();
  index = input.required<number>();
  total = input.required<number>();

  protected isVisible = signal(false);
  private observer?: IntersectionObserver;

  protected isEven = computed(() => this.index() % 2 === 0);
  protected projectNumber = computed(() => `${this.index() + 1} / ${this.total()}`);
  protected githubLinks = computed(() => getGitHubLinks(this.project()));
  protected arrowImage = computed(() =>
    this.themeService.activeTheme() === 'dark'
      ? '/assets/images/vector/arrows/arrow-light.svg'
      : '/assets/images/vector/arrows/arrow-dark.svg'
  );
  protected borderColor = computed(() =>
    this.themeService.activeTheme() === 'dark' ? 'var(--color-primary)' : '#000000'
  );

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   * Setup intersection observer for scroll animations
   */
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
      threshold: 0.2,
    });
    this.observer.observe(this.el.nativeElement);
  }

  /**
   * Handle intersection observer callback
   * @param entries - Intersection observer entries
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.isVisible.set(true);
      }
      // this.isVisible.set(entry.isIntersecting); // For toggle on scroll out
    });
  }

  /**
   * Open external link in new tab
   * @param url - URL to open
   */
  protected openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Get GitHub button label based on index
   * @param index - GitHub link index
   * @returns Button label text
   */
  protected getGithubLabel(index: number): string {
    const labels = ['Frontend', 'Backend', 'GitHub'];
    return labels[index] || `GitHub ${index + 1}`;
  }
}
