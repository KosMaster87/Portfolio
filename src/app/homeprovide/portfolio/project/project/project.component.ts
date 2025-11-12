/**
 * @fileoverview ProjectComponent for displaying individual projects in the portfolio.
 * @description This component represents a single project within the portfolio section,
 *              displaying project details and supporting functionality for linking to
 *              external project pages.
 * @module homeprovide/portfolio/project
 */

import {
  Component,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  inject,
  viewChildren,
  effect,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioDataService } from './../../../../shared/services/portfolioData/portfolio-data.service';
import { Project } from './../../../../models/project/project';
import { SharedModule } from './../../../../future-modul/shared.module';

/**
 * ProjectComponent represents an individual project within the portfolio section of the application.
 * It displays project details and supports functionality for linking to external project pages.
 *
 * **Features:**
 * - Displays project information such as name, description, and links.
 * - Adds dynamic visibility on scroll when the project becomes visible on the screen.
 * - Supports odd/even classification for styling purposes.
 */
@Component({
  selector: 'app-project',

  imports: [CommonModule, TranslateModule, SharedModule],
  templateUrl: './project.component.html',
  styleUrls: [
    './project.component.scss',
    './../../../../shared/styles/highlighting.scss',
  ],
})
export class ProjectComponent implements AfterViewInit, OnDestroy {
  public isVisible = false;
  private el: ElementRef = inject(ElementRef);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  data = inject(PortfolioDataService);
  projectsLength!: number;
  projects!: Project[];
  private resizeObserver?: ResizeObserver;
  sliderElements = viewChildren<ElementRef>('sliderElement');

  constructor() {
    effect(() => {
      const elements = this.sliderElements();

      if (elements.length > 0 && this.resizeObserver) {
        this.resizeObserver.disconnect();

        elements.forEach((sliderRef, index) => {
          if (this.resizeObserver) {
            this.resizeObserver.observe(sliderRef.nativeElement);
          }
        });
      }
    });
  }

  /**
   * ngOnInit lifecycle hook to initialize the component.
   *
   * It initializes the `projectsLength` and `projects` properties by retrieving data from
   * the PortfolioDataService.
   */
  ngOnInit(): void {
    this.projectsLength = this.data.projects.length;
    this.projects = this.data.projects;
  }

  /**
   * Determines whether the given number is odd or even.
   *
   * @param {number} num - The number to check.
   * @returns {string} - 'even' if the number is even, 'odd' if the number is odd.
   */
  oddOrEven(num: number): string {
    return num % 2 === 0 ? 'even' : 'odd';
  }

  /**
   * Opens the provided URL in a new tab.
   *
   * This method creates a temporary link element and triggers a click event to open
   * the URL in a new browser tab.
   *
   * @param {string} url - The URL to be opened.
   */
  openLink(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Checks if the linkToGit property is an array of strings.
   *
   * @param {string | string[]} linkToGit - The linkToGit property from project.
   * @returns {boolean} - True if linkToGit is an array, false otherwise.
   */
  isArrayOfLinks(linkToGit: string | string[]): linkToGit is string[] {
    return Array.isArray(linkToGit);
  }

  /**
   * Gets the appropriate button label for GitHub links based on index.
   *
   * @param {number} index - The index of the GitHub link in the array.
   * @returns {string} - The label for the GitHub button.
   */
  getGitHubButtonLabel(index: number): string {
    const labels = ['Frontend', 'Backend', 'GitHub'];
    return labels[index] || `GitHub ${index + 1}`;
  }

  /**
   * Opens a single GitHub link when linkToGit is a string.
   * Fallback for cases where only one link is provided.
   *
   * @param {string | string[]} linkToGit - The linkToGit property from project.
   */
  openSingleGitHubLink(linkToGit: string | string[]): void {
    if (typeof linkToGit === 'string') {
      this.openLink(linkToGit);
    }
  }

  /**
   * ngAfterViewInit lifecycle hook to initialize the IntersectionObserver for detecting
   * the visibility of the project in the viewport.
   *
   * When the project element is visible on the screen (above the threshold), it updates
   * the `isVisible` property to trigger visibility-based animations or styling.
   *
   * Also initializes ResizeObserver to dynamically adjust mainProjectBox heights based on slider content.
   */
  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.cdr.detectChanges();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.el.nativeElement);
    this.createResizeObserver();
  }

  /**
   * Creates ResizeObserver to monitor slider height changes.
   * The actual observation is handled by the effect() in the constructor.
   */
  private createResizeObserver(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry, index) => {
        const sliderElement = entry.target as HTMLElement;
        const mainProjectBox = sliderElement.parentElement;

        if (
          mainProjectBox &&
          mainProjectBox.classList.contains('mainProjectBox')
        ) {
          const rectangle = sliderElement.querySelector(
            '.rectangle'
          ) as HTMLElement;
          const infoBox = sliderElement.querySelector(
            '.infoBox'
          ) as HTMLElement;

          if (rectangle && infoBox) {
            const rectangleHeight = rectangle.offsetHeight;
            const infoBoxHeight = infoBox.offsetHeight;
            const sliderTotalHeight = rectangleHeight + infoBoxHeight;
            const mainProjectBoxHeight = mainProjectBox.offsetHeight;
            const flexDirection =
              getComputedStyle(mainProjectBox).flexDirection;
            const isRowLayout =
              flexDirection === 'row' || flexDirection === 'row-reverse';

            let marginNeeded = 0;

            if (isRowLayout) {
              // Bei row-Layout: Elemente sind NEBENEINANDER
              // .slider Höhe ist die Höhe des höchsten Elements (rectangle oder infoBox)
              const sliderActualHeight = Math.max(
                rectangleHeight,
                infoBoxHeight
              );
              marginNeeded = Math.max(
                0,
                sliderActualHeight - mainProjectBoxHeight
              );
            } else {
              // Bei column-Layout: Elemente sind UNTEREINANDER
              // .slider Höhe ist rectangle + infoBox
              marginNeeded = Math.max(
                0,
                sliderTotalHeight - mainProjectBoxHeight
              );
            }

            mainProjectBox.style.setProperty(
              '--slider-height',
              `${marginNeeded}px`
            );
          } else {
            console.warn(
              `⚠️ [Entry ${index}] .rectangle or .infoBox not found`,
              {
                hasRectangle: !!rectangle,
                hasInfoBox: !!infoBox,
              }
            );
          }
        } else {
          console.warn(
            `❌ [Entry ${index}] mainProjectBox not found or wrong class!`
          );
        }
      });
    });
  }

  /**
   * Cleanup method to disconnect the ResizeObserver when component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
