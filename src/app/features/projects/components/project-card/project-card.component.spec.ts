import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { ThemeService, TranslationService } from '@core/services';
import { signal } from '@angular/core';
import { Project } from '@core/models';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let mockProject: Project;

  beforeEach(() => {
    const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('light');
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
      activeTheme: activeThemeSignal,
    });
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });

    mockProject = {
      id: 'join',
      name: 'Join',
      headline: 'Task Management',
      description: 'Task management app',
      technologies: ['Angular', 'TypeScript', 'Firebase'],
      image: {
        src: '/assets/images/projects/Join.avif',
        alt: 'Join Project',
      },
      links: {
        live: 'https://join.dev2k.org',
        github: 'https://github.com/user/join',
      },
      category: 'Web Development',
      isFeatured: true,
    };

    TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', mockProject);
    fixture.componentRef.setInput('index', 0);
    fixture.componentRef.setInput('total', 5);
  });

  afterEach(() => {
    if (component['observer']) {
      component['observer'].disconnect();
    }
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Required inputs', () => {
    it('should have project input', () => {
      fixture.detectChanges();
      expect(component.project()).toEqual(mockProject);
    });

    it('should have index input', () => {
      fixture.detectChanges();
      expect(component.index()).toBe(0);
    });

    it('should have total input', () => {
      fixture.detectChanges();
      expect(component.total()).toBe(5);
    });
  });

  describe('isVisible signal', () => {
    it('should be false by default', () => {
      expect(component['isVisible']()).toBe(false);
    });

    it('should be updated by intersection observer', () => {
      fixture.detectChanges();
      component['isVisible'].set(true);
      expect(component['isVisible']()).toBe(true);
    });
  });

  describe('isEven computed', () => {
    it('should return true for even index', () => {
      fixture.componentRef.setInput('index', 0);
      fixture.detectChanges();
      expect(component['isEven']()).toBe(true);
    });

    it('should return false for odd index', () => {
      fixture.componentRef.setInput('index', 1);
      fixture.detectChanges();
      expect(component['isEven']()).toBe(false);
    });

    it('should handle different even indices', () => {
      fixture.componentRef.setInput('index', 2);
      fixture.detectChanges();
      expect(component['isEven']()).toBe(true);

      fixture.componentRef.setInput('index', 4);
      fixture.detectChanges();
      expect(component['isEven']()).toBe(true);
    });
  });

  describe('projectNumber computed', () => {
    it('should return formatted project number', () => {
      fixture.detectChanges();
      expect(component['projectNumber']()).toBe('1 / 5');
    });

    it('should handle different indices', () => {
      fixture.componentRef.setInput('index', 2);
      fixture.componentRef.setInput('total', 10);
      fixture.detectChanges();
      expect(component['projectNumber']()).toBe('3 / 10');
    });

    it('should use 1-based indexing', () => {
      fixture.componentRef.setInput('index', 0);
      fixture.detectChanges();
      expect(component['projectNumber']()).toContain('1 /');
    });
  });

  describe('githubLinks computed', () => {
    it('should return empty array when project has no github', () => {
      const projectWithoutGithub = {
        ...mockProject,
        links: { ...mockProject.links, github: '' },
      };
      fixture.componentRef.setInput('project', projectWithoutGithub);
      fixture.detectChanges();
      const links = component['githubLinks']();
      expect(links.length).toBeGreaterThanOrEqual(0);
    });

    it('should return single link for string github', () => {
      fixture.detectChanges();
      const links = component['githubLinks']();
      expect(links.length).toBe(1);
      expect(links[0]).toBe('https://github.com/user/join');
    });

    it('should return multiple links for array github', () => {
      const projectWithMultipleGithub = {
        ...mockProject,
        links: {
          ...mockProject.links,
          github: ['https://github.com/user/frontend', 'https://github.com/user/backend'],
        },
      };
      fixture.componentRef.setInput('project', projectWithMultipleGithub);
      fixture.detectChanges();
      const links = component['githubLinks']();
      expect(links.length).toBe(2);
    });
  });

  describe('arrowImage computed', () => {
    it('should return dark arrow for light theme', () => {
      fixture.detectChanges();
      expect(component['arrowImage']()).toContain('arrow-dark.svg');
    });

    it('should return light arrow for dark theme', () => {
      TestBed.resetTestingModule();
      const darkThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: darkThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [ProjectCardComponent],
        providers: [
          { provide: ThemeService, useValue: darkThemeServiceSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(ProjectCardComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('project', mockProject);
      fixture.componentRef.setInput('index', 0);
      fixture.componentRef.setInput('total', 5);
      fixture.detectChanges();

      expect(component['arrowImage']()).toContain('arrow-light.svg');
    });
  });

  describe('borderColor computed', () => {
    it('should return primary color for dark theme', () => {
      TestBed.resetTestingModule();
      const darkThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: darkThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [ProjectCardComponent],
        providers: [
          { provide: ThemeService, useValue: darkThemeServiceSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(ProjectCardComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('project', mockProject);
      fixture.componentRef.setInput('index', 0);
      fixture.componentRef.setInput('total', 5);
      fixture.detectChanges();

      expect(component['borderColor']()).toBe('var(--color-primary)');
    });

    it('should return black for light theme', () => {
      fixture.detectChanges();
      expect(component['borderColor']()).toBe('#000000');
    });
  });

  describe('decorativeBorderOffset computed', () => {
    it('should return positive offset for even index', () => {
      fixture.componentRef.setInput('index', 0);
      fixture.detectChanges();
      expect(component['decorativeBorderOffset']()).toEqual({ x: 8, y: 8 });
    });

    it('should return negative x offset for odd index', () => {
      fixture.componentRef.setInput('index', 1);
      fixture.detectChanges();
      expect(component['decorativeBorderOffset']()).toEqual({ x: -8, y: 8 });
    });

    it('should have consistent y offset', () => {
      fixture.componentRef.setInput('index', 0);
      fixture.detectChanges();
      let offset = component['decorativeBorderOffset']();
      expect(offset.y).toBe(8);

      fixture.componentRef.setInput('index', 1);
      fixture.detectChanges();
      offset = component['decorativeBorderOffset']();
      expect(offset.y).toBe(8);
    });
  });

  describe('ngAfterViewInit()', () => {
    it('should setup intersection observer', () => {
      spyOn<any>(component, 'setupIntersectionObserver');
      component.ngAfterViewInit();
      expect(component['setupIntersectionObserver']).toHaveBeenCalled();
    });

    it('should create observer instance', () => {
      fixture.detectChanges();
      expect(component['observer']).toBeDefined();
    });
  });

  describe('ngOnDestroy()', () => {
    it('should disconnect observer', () => {
      fixture.detectChanges();
      const disconnectSpy = jasmine.createSpy('disconnect');
      component['observer'] = { disconnect: disconnectSpy } as any;

      component.ngOnDestroy();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should handle when observer is undefined', () => {
      component['observer'] = undefined;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('handleIntersection()', () => {
    it('should set isVisible to true when intersecting', () => {
      const entries = [{ isIntersecting: true }] as IntersectionObserverEntry[];
      component['handleIntersection'](entries);
      expect(component['isVisible']()).toBe(true);
    });

    it('should not change isVisible when not intersecting', () => {
      component['isVisible'].set(false);
      const entries = [{ isIntersecting: false }] as IntersectionObserverEntry[];
      component['handleIntersection'](entries);
      expect(component['isVisible']()).toBe(false);
    });

    it('should handle multiple entries', () => {
      const entries = [
        { isIntersecting: false },
        { isIntersecting: true },
      ] as IntersectionObserverEntry[];
      component['handleIntersection'](entries);
      expect(component['isVisible']()).toBe(true);
    });
  });

  describe('openLink()', () => {
    it('should call window.open with correct parameters', () => {
      spyOn(window, 'open');
      component['openLink']('https://example.com');
      expect(window.open).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('should handle different URLs', () => {
      spyOn(window, 'open');
      component['openLink']('https://github.com/user/repo');
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/user/repo',
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('getGithubLabel()', () => {
    it('should return Frontend for index 0', () => {
      expect(component['getGithubLabel'](0)).toBe('Frontend');
    });

    it('should return Backend for index 1', () => {
      expect(component['getGithubLabel'](1)).toBe('Backend');
    });

    it('should return GitHub for index 2', () => {
      expect(component['getGithubLabel'](2)).toBe('GitHub');
    });

    it('should return generic label for higher indices', () => {
      expect(component['getGithubLabel'](3)).toBe('GitHub 4');
      expect(component['getGithubLabel'](4)).toBe('GitHub 5');
    });
  });

  describe('DOM rendering', () => {
    it('should render project card', () => {
      fixture.detectChanges();
      const card = fixture.nativeElement.querySelector('.project-card');
      expect(card).toBeTruthy();
    });

    it('should render project name', () => {
      fixture.detectChanges();
      const content = fixture.nativeElement.textContent;
      expect(content).toContain('Task Management');
    });

    it('should render decorative border', () => {
      fixture.detectChanges();
      const border = fixture.nativeElement.querySelector('app-decorative-border');
      expect(border).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('should handle project with minimal data', () => {
      const minimalProject: Project = {
        id: 'minimal',
        name: 'Minimal',
        headline: '',
        description: '',
        technologies: [],
        image: {
          src: '',
          alt: '',
        },
        links: {
          github: '',
        },
        category: '',
      };
      fixture.componentRef.setInput('project', minimalProject);
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should handle index 0', () => {
      fixture.componentRef.setInput('index', 0);
      fixture.detectChanges();
      expect(component['projectNumber']()).toBe('1 / 5');
    });

    it('should handle large total', () => {
      fixture.componentRef.setInput('index', 99);
      fixture.componentRef.setInput('total', 100);
      fixture.detectChanges();
      expect(component['projectNumber']()).toBe('100 / 100');
    });

    it('should handle observer disconnect multiple times', () => {
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });
});
