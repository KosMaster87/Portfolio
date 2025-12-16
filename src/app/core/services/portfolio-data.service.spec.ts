import { TestBed } from '@angular/core/testing';
import { PortfolioDataService } from './portfolio-data.service';
import { Project } from '../models/project.model';

describe('PortfolioDataService', () => {
  let service: PortfolioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('projects property', () => {
    it('should have projects array defined', () => {
      expect(service.projects).toBeDefined();
      expect(Array.isArray(service.projects)).toBe(true);
    });

    it('should have at least one project', () => {
      expect(service.projects.length).toBeGreaterThan(0);
    });

    it('should have valid project structure', () => {
      const project = service.projects[0];

      expect(project.id).toBeDefined();
      expect(project.name).toBeDefined();
      expect(project.headline).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.image).toBeDefined();
      expect(project.links).toBeDefined();
      expect(project.technologies).toBeDefined();
      expect(project.category).toBeDefined();
      expect(typeof project.isFeatured).toBe('boolean');
    });
  });

  describe('getProjects()', () => {
    it('should return all projects', () => {
      const projects = service.getProjects();

      expect(projects).toEqual(service.projects);
      expect(projects.length).toBe(service.projects.length);
    });

    it('should return array of Project objects', () => {
      const projects = service.getProjects();

      projects.forEach((project) => {
        expect(project).toEqual(
          jasmine.objectContaining({
            id: jasmine.any(String),
            name: jasmine.any(String),
            headline: jasmine.any(String),
          })
        );
      });
    });
  });

  describe('getFeaturedProjects()', () => {
    it('should return only featured projects', () => {
      const featured = service.getFeaturedProjects();

      featured.forEach((project) => {
        expect(project.isFeatured).toBe(true);
      });
    });

    it('should return fewer or equal projects than total', () => {
      const featured = service.getFeaturedProjects();
      const total = service.getProjects();

      expect(featured.length).toBeLessThanOrEqual(total.length);
    });

    it('should return at least one featured project', () => {
      const featured = service.getFeaturedProjects();

      expect(featured.length).toBeGreaterThan(0);
    });

    it('should not include non-featured projects', () => {
      const featured = service.getFeaturedProjects();
      const nonFeatured = featured.filter((p) => !p.isFeatured);

      expect(nonFeatured.length).toBe(0);
    });
  });

  describe('getProjectById()', () => {
    it('should return project when ID exists', () => {
      const firstProject = service.projects[0];
      const found = service.getProjectById(firstProject.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(firstProject.id);
    });

    it('should return undefined when ID does not exist', () => {
      const found = service.getProjectById('non-existent-id');

      expect(found).toBeUndefined();
    });

    it('should return correct project for lets-todo', () => {
      const project = service.getProjectById('lets-todo');

      expect(project).toBeDefined();
      expect(project?.id).toBe('lets-todo');
      expect(project?.name).toBe('PROJECTS.lets-todo-name');
    });

    it('should return correct project for join', () => {
      const project = service.getProjectById('join');

      expect(project).toBeDefined();
      expect(project?.id).toBe('join');
      expect(project?.name).toBe('PROJECTS.join-name');
    });

    it('should be case-sensitive', () => {
      const found = service.getProjectById('JOIN');

      expect(found).toBeUndefined();
    });
  });

  describe('getProjectCount()', () => {
    it('should return total number of projects', () => {
      const count = service.getProjectCount();

      expect(count).toBe(service.projects.length);
    });

    it('should return a positive number', () => {
      const count = service.getProjectCount();

      expect(count).toBeGreaterThan(0);
    });

    it('should match actual array length', () => {
      const count = service.getProjectCount();
      const actualLength = service.projects.length;

      expect(count).toBe(actualLength);
    });
  });

  describe('Project data integrity', () => {
    it('should have unique project IDs', () => {
      const ids = service.projects.map((p) => p.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid image paths', () => {
      service.projects.forEach((project) => {
        expect(project.image.src).toContain('/assets/images/projects/');
        expect(project.image.src).toContain('.avif');
      });
    });

    it('should have valid links', () => {
      service.projects.forEach((project) => {
        expect(project.links.live).toContain('https://');

        if (Array.isArray(project.links.github)) {
          project.links.github.forEach((link) => {
            expect(link).toContain('github.com');
          });
        } else {
          expect(project.links.github).toContain('github.com');
        }
      });
    });

    it('should have at least one technology per project', () => {
      service.projects.forEach((project) => {
        expect(project.technologies.length).toBeGreaterThan(0);
      });
    });

    it('should have valid category values', () => {
      const validCategories = ['fullstack', 'web-app', 'mobile', 'backend', 'frontend'];

      service.projects.forEach((project) => {
        expect(validCategories).toContain(project.category);
      });
    });
  });
});
