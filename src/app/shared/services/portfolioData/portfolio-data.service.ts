import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PortfolioDataService {
  myProjects = [
    {
      img: "assets/images/projects/Join.avif",
      alt: "Image of project: Join.",
      linkToPage: "https://join.dev2k.net/",
      linkToGit: "https://github.com/KosMaster87/Join.git",
      projectName: "Join",
      headline: "Javascript | Firebase | CSS | HTML",
      description: "",
    },
    {
      img: "assets/images/projects/Loco.avif",
      alt: "Image of project: El pollo loco.",
      linkToPage: "https://el-pollo-loco.dev2k.net/",
      linkToGit: "https://github.com/KosMaster87/El-pollo-loco.git",
      projectName: "El Pollo Loco",
      headline: "Javascript | CSS | HTML",
      description: "",
    },
  ];

  myReferences = [
    {
      name: "Marijan D.",
      position: "Team Partner",
      reference: "Top Kollege.",
    },
    {
      name: "Martin X.",
      position: "Team Partner",
      reference: "Top Kollege.",
    },
    {
      name: "Viktor Willhelm",
      position: "DA Student",
      reference: "Top Kollege.",
    },
  ];
}
