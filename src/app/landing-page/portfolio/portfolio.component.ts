import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectComponent } from "./project/project.component";

// Service Data
import { PortfolioDataService } from "./../../../app/shared/services/portfolioData/portfolio-data.service";

// Service Translate
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-portfolio",
  standalone: true,
  imports: [ProjectComponent, CommonModule, TranslateModule],
  templateUrl: "./portfolio.component.html",
  styleUrl: "./portfolio.component.scss",
})
export class PortfolioComponent {
  // data = inject(PortfolioDataService);

  /**
   * Repräsentiert hier den Index des Projekts, der in PortfolioComponent gesetzt (project="{{ $index }}") wird.
   * Dadurch weiß ProjectComponent, welches Projekt im DataServiceService-Array (myProjects) es rendern soll.
   */
  // @Input() project = "";
}
