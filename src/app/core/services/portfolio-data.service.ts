/**
 * @fileoverview Portfolio Data Service
 * @description Provides static portfolio project data
 * @module core/services
 */

import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  readonly projects: Project[] = [
    {
      id: 'lets-todo',
      name: 'PROJECTS.lets-todo-name',
      headline: 'Vanilla JS | PHP | Express | MariaDB',
      description: 'PROJECTS.lets-todo-description',
      image: {
        src: '/assets/images/projects/lets-todo.avif',
        alt: 'PROJECTS.lets-todo-alt',
      },
      links: {
        live: 'https://lets-todo.dev2k.org/',
        github: [
          'https://github.com/KosMaster87/lets-todo-app',
          'https://github.com/KosMaster87/lets-todo-api',
        ],
      },
      technologies: ['JavaScript', 'PHP', 'Node.js', 'REST API'],
      category: 'fullstack',
      isFeatured: true,
    },
    {
      id: 'super-rando',
      name: 'PROJECTS.super-rando-name',
      headline: 'Javascript | CSS | HTML | PHP',
      description: 'PROJECTS.super-rando-description',
      image: {
        src: '/assets/images/projects/Super~Rando.avif',
        alt: 'PROJECTS.super-rando-alt',
      },
      links: {
        live: 'https://super-rando.dev2k.org/',
        github: 'https://github.com/KosMaster87/Super-Rando',
      },
      technologies: ['JavaScript', 'CSS', 'HTML', 'PHP'],
      category: 'web-app',
      isFeatured: true,
    },
    {
      id: 'join',
      name: 'PROJECTS.join-name',
      headline: 'Javascript | CSS | HTML',
      description: 'PROJECTS.join-description',
      image: {
        src: '/assets/images/projects/Join.avif',
        alt: 'PROJECTS.join-alt',
      },
      links: {
        live: 'https://join.dev2k.org/',
        github: 'https://github.com/KosMaster87/Join.git',
      },
      technologies: ['JavaScript', 'CSS', 'HTML'],
      category: 'web-app',
      isFeatured: false,
    },
    {
      id: 'el-pollo-loco',
      name: 'PROJECTS.loco-name',
      headline: 'Javascript | CSS | HTML',
      description: 'PROJECTS.loco-description',
      image: {
        src: '/assets/images/projects/Loco.avif',
        alt: 'PROJECTS.loco-alt',
      },
      links: {
        live: 'https://el-pollo-loco.dev2k.org/',
        github: 'https://github.com/KosMaster87/El-pollo-loco.git',
      },
      technologies: ['JavaScript', 'CSS', 'HTML'],
      category: 'web-app',
      isFeatured: false,
    },
  ];

  /**
   * Get all projects
   * @returns Array of all projects
   */
  getProjects(): Project[] {
    return this.projects;
  }

  /**
   * Get featured projects only
   * @returns Array of featured projects
   */
  getFeaturedProjects(): Project[] {
    return this.projects.filter((p) => p.isFeatured);
  }

  /**
   * Get project by ID
   * @param id - Project ID to find
   * @returns Project or undefined
   */
  getProjectById(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }

  /**
   * Get project count
   * @returns Total number of projects
   */
  getProjectCount(): number {
    return this.projects.length;
  }
}
