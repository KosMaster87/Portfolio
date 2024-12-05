import {
  Component,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  inject,
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
export class ProjectComponent implements AfterViewInit {
  public isVisible = false;
  private el: ElementRef = inject(ElementRef);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  data = inject(PortfolioDataService);
  projectsLength!: number;
  projects!: Project[];

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
   * ngAfterViewInit lifecycle hook to initialize the IntersectionObserver for detecting
   * the visibility of the project in the viewport.
   *
   * When the project element is visible on the screen (above the threshold), it updates
   * the `isVisible` property to trigger visibility-based animations or styling.
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
  }
}
