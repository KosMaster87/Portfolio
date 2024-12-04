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

  ngOnInit(): void {
    this.projectsLength = this.data.projects.length;
    this.projects = this.data.projects;
  }

  oddOrEven(num: number): string {
    return num % 2 === 0 ? 'even' : 'odd';
  }

  openLink(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
