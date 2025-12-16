import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsSectionComponent } from './projects-section.component';
import { PortfolioDataService, TranslationService } from '@core/services';
import { signal } from '@angular/core';
import { Project } from '@core/models';

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent;
  let fixture: ComponentFixture<ProjectsSectionComponent>;
  let portfolioDataServiceSpy: jasmine.SpyObj<PortfolioDataService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let mockProjects: Project[];

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    mockProjects = [
      {
        id: 'join',
        name: 'Join',
        headline: 'Task Management',
        description: 'Task management application',
        technologies: ['Angular', 'TypeScript', 'Firebase'],
        image: { src: '/assets/images/projects/Join.avif', alt: 'Join' },
        links: { github: 'https://github.com/user/join', live: 'https://join.dev2k.org' },
        category: 'Web Development',
        isFeatured: true,
      },
      {
        id: 'loco',
        name: 'Loco',
        headline: 'Delivery Service',
        description: 'Food delivery app',
        technologies: ['Angular', 'TypeScript'],
        image: { src: '/assets/images/projects/Loco.avif', alt: 'Loco' },
        links: { github: 'https://github.com/user/loco' },
        category: 'Web Development',
      },
    ];

    portfolioDataServiceSpy = jasmine.createSpyObj('PortfolioDataService', [
      'getProjects',
      'getProjectCount',
    ]);
    portfolioDataServiceSpy.getProjects.and.returnValue(mockProjects);
    portfolioDataServiceSpy.getProjectCount.and.returnValue(mockProjects.length);

    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });

    TestBed.configureTestingModule({
      imports: [ProjectsSectionComponent],
      providers: [
        { provide: PortfolioDataService, useValue: portfolioDataServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ProjectsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('projects computed', () => {
    it('should return projects from portfolio data service', () => {
      const projects = component['projects']();
      expect(projects).toEqual(mockProjects);
    });

    it('should call getProjects', () => {
      component['projects']();
      expect(portfolioDataServiceSpy.getProjects).toHaveBeenCalled();
    });

    it('should return array of projects', () => {
      const projects = component['projects']();
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBe(2);
    });

    it('should return all projects with their properties', () => {
      const projects = component['projects']();
      expect(projects[0].id).toBe('join');
      expect(projects[1].id).toBe('loco');
    });
  });

  describe('projectCount computed', () => {
    it('should return project count from portfolio data service', () => {
      const count = component['projectCount']();
      expect(count).toBe(2);
    });

    it('should call getProjectCount', () => {
      component['projectCount']();
      expect(portfolioDataServiceSpy.getProjectCount).toHaveBeenCalled();
    });

    it('should return correct count value', () => {
      const count = component['projectCount']();
      expect(count).toBe(mockProjects.length);
    });

    it('should match count with projects array length', () => {
      const projects = component['projects']();
      const count = component['projectCount']();
      expect(count).toBe(projects.length);
    });
  });

  describe('DOM rendering', () => {
    it('should render projects section', () => {
      const section = fixture.nativeElement.querySelector('.projects-section');
      expect(section).toBeTruthy();
    });

    it('should render project cards', () => {
      const projectCards = fixture.nativeElement.querySelectorAll('app-project-card');
      expect(projectCards.length).toBe(2);
    });

    it('should render separator', () => {
      const separator = fixture.nativeElement.querySelector('app-separator');
      expect(separator).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('should pass correct data to project cards', () => {
      const projects = component['projects']();
      expect(projects[0].name).toBe('Join');
      expect(projects[1].name).toBe('Loco');
    });

    it('should have consistent data between projects and count', () => {
      const projects = component['projects']();
      const count = component['projectCount']();
      expect(projects.length).toBe(count);
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined projects gracefully', () => {
      portfolioDataServiceSpy.getProjects.and.returnValue(undefined as any);
      expect(() => component['projects']()).not.toThrow();
    });

    it('should handle null count gracefully', () => {
      portfolioDataServiceSpy.getProjectCount.and.returnValue(null as any);
      expect(() => component['projectCount']()).not.toThrow();
    });
  });
});
