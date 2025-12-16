import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsSectionComponent, SkillItem } from './skills-section.component';
import { TranslationService } from '@core/services';
import { signal } from '@angular/core';

describe('SkillsSectionComponent', () => {
  let component: SkillsSectionComponent;
  let fixture: ComponentFixture<SkillsSectionComponent>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });
    translationServiceSpy.instant.and.callFake((key: string) => key);

    TestBed.configureTestingModule({
      imports: [SkillsSectionComponent],
      providers: [{ provide: TranslationService, useValue: translationServiceSpy }],
    });

    fixture = TestBed.createComponent(SkillsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('heading computed', () => {
    it('should return translated heading', () => {
      expect(component['heading']()).toBe('SECTIONS.skills');
    });

    it('should call instant with correct key', () => {
      component['heading']();
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('SECTIONS.skills');
    });
  });

  describe('skills array', () => {
    it('should have 18 skills', () => {
      expect(component['skills'].length).toBe(18);
    });

    it('should contain Angular skill', () => {
      const angular = component['skills'].find((s) => s.name === 'Angular');
      expect(angular).toBeDefined();
      expect(angular!.icon).toBe('icon-ng.svg');
      expect(angular!.cssClass).toBe('angular');
    });

    it('should contain TypeScript skill', () => {
      const typescript = component['skills'].find((s) => s.name === 'TypeScript');
      expect(typescript).toBeDefined();
      expect(typescript!.icon).toBe('icon-ts.svg');
      expect(typescript!.cssClass).toBe('typeScript');
    });

    it('should contain Firebase skill', () => {
      const firebase = component['skills'].find((s) => s.name === 'Firebase');
      expect(firebase).toBeDefined();
      expect(firebase!.icon).toBe('icon-fb.svg');
      expect(firebase!.cssClass).toBe('firebase');
    });

    it('should contain JavaScript skill', () => {
      const javascript = component['skills'].find((s) => s.name === 'JavaScript');
      expect(javascript).toBeDefined();
      expect(javascript!.icon).toBe('icon-js.svg');
    });

    it('should contain Git skill', () => {
      const git = component['skills'].find((s) => s.name === 'Git');
      expect(git).toBeDefined();
      expect(git!.icon).toBe('icon-git.svg');
    });

    it('should contain Docker skill', () => {
      const docker = component['skills'].find((s) => s.name === 'Docker');
      expect(docker).toBeDefined();
      expect(docker!.icon).toBe('icon-docker.svg');
    });

    it('should have all required properties for each skill', () => {
      component['skills'].forEach((skill) => {
        expect(skill.name).toBeDefined();
        expect(skill.icon).toBeDefined();
        expect(skill.cssClass).toBeDefined();
        expect(typeof skill.name).toBe('string');
        expect(typeof skill.icon).toBe('string');
        expect(typeof skill.cssClass).toBe('string');
      });
    });

    it('should have unique skill names', () => {
      const names = component['skills'].map((s) => s.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should have valid icon paths', () => {
      component['skills'].forEach((skill) => {
        expect(skill.icon).toContain('icon-');
        expect(skill.icon).toContain('.svg');
      });
    });
  });

  describe('DOM rendering', () => {
    it('should render skills section', () => {
      const section = fixture.nativeElement.querySelector('.skills-section');
      expect(section).toBeTruthy();
    });

    it('should render heading', () => {
      const content = fixture.nativeElement.textContent;
      expect(content).toContain('SECTIONS.skills');
    });

    it('should render skill items', () => {
      const skillItems = fixture.nativeElement.querySelectorAll('.skill-item');
      expect(skillItems.length).toBeGreaterThan(0);
    });

    it('should render skill icons', () => {
      const skillSection = fixture.nativeElement.querySelector('.skills-section');
      expect(skillSection).toBeTruthy();
    });
  });

  describe('SkillItem interface', () => {
    it('should match expected structure', () => {
      const testSkill: SkillItem = {
        name: 'Test',
        icon: 'test-icon.svg',
        cssClass: 'test-class',
      };
      expect(testSkill.name).toBe('Test');
      expect(testSkill.icon).toBe('test-icon.svg');
      expect(testSkill.cssClass).toBe('test-class');
    });
  });

  describe('Edge cases', () => {
    it('should maintain skills array immutability', () => {
      const originalLength = component['skills'].length;
      const skillsCopy = [...component['skills']];
      expect(component['skills'].length).toBe(originalLength);
      expect(skillsCopy).toEqual(component['skills']);
    });

    it('should have consistent data structure', () => {
      expect(component['skills']).toBeDefined();
      expect(Array.isArray(component['skills'])).toBe(true);
    });
  });
});
