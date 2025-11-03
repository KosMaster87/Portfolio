import { Injectable } from '@angular/core';
import { Project } from '../../../models/project/project';

/**
 * Service to provide portfolio-related data, including project details and references.
 *
 * This service centralizes static data for portfolio components, making it easily reusable
 * across the application.
 */
@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  projects: Project[] = [
    {
      projectName: 'PROJECTS.lets-todo-projectName',
      description: 'PROJECTS.lets-todo-description',
      alt: 'PROJECTS.lets-todo-alt',
      img: 'assets/images/projects/lets-todo.avif',
      linkToPage: 'https://lets-todo.dev2k.org/',
      linkToGit: [
        'https://github.com/KosMaster87/lets-todo-app',
        'https://github.com/KosMaster87/lets-todo-api',
      ],
      headline: 'Vanilla JS | PHP | Node.js | Express | MariaDB',
    },
    {
      projectName: 'PROJECTS.super-rando-projectName',
      description: 'PROJECTS.super-rando-description',
      alt: 'PROJECTS.super-rando-alt',
      img: 'assets/images/projects/Super~Rando.avif',
      linkToPage: 'https://super-rando.dev2k.org/',
      linkToGit: 'https://github.com/KosMaster87/Super-Rando',
      headline: 'Javascript | CSS | HTML | PHP',
    },
    {
      projectName: 'PROJECTS.join-projectName',
      description: 'PROJECTS.join-description',
      alt: 'PROJECTS.join-alt',
      img: 'assets/images/projects/Join.avif',
      linkToPage: 'https://join.dev2k.org/',
      linkToGit: 'https://github.com/KosMaster87/Join.git',
      headline: 'Javascript | CSS | HTML',
    },
    {
      projectName: 'PROJECTS.loco-projectName',
      description: 'PROJECTS.loco-description',
      alt: 'PROJECTS.loco-alt',
      img: 'assets/images/projects/Loco.avif',
      linkToPage: 'https://el-pollo-loco.dev2k.org/',
      linkToGit: 'https://github.com/KosMaster87/El-pollo-loco.git',
      headline: 'Javascript | CSS | HTML',
    },
  ];

  myReferences = [
    {
      name: 'Marijan D.',
      position: 'Team Partner',
      reference: 'Top Kollege.',
    },
    {
      name: 'Martin X.',
      position: 'Team Partner',
      reference: 'Top Kollege.',
    },
    {
      name: 'Viktor Willhelm',
      position: 'DA Student',
      reference: 'Top Kollege.',
    },
  ];
}
