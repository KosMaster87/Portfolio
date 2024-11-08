import { Component } from "@angular/core";

import { AboutComponent } from "./about/about.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SkillsComponent } from "./skills/skills.component";
import { CommentsComponent } from "./comments/comments.component";
import { ContactComponent } from "./contact/contact.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [
    AboutComponent,
    PortfolioComponent,
    SkillsComponent,
    // CommentsComponent,
    ContactComponent,
    TranslateModule,
  ],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.scss",
})
export class LandingPageComponent {}
