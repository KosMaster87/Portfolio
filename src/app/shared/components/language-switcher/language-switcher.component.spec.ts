import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { TranslationService } from '../../../core/services';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['use'], {
      currentLang: jasmine.createSpy('currentLang').and.returnValue('en'),
    });

    TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent],
      providers: [{ provide: TranslationService, useValue: translationServiceSpy }],
    });

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signals', () => {
    it('should have isDropdownOpen signal initially false', () => {
      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should return current language from translation service', () => {
      expect(component.currentLanguage()).toBe('en');
    });
  });

  describe('languages property', () => {
    it('should have exactly 2 languages', () => {
      expect(component.languages.length).toBe(2);
    });

    it('should have English language', () => {
      const english = component.languages.find((lang) => lang.code === 'en');

      expect(english).toBeDefined();
      expect(english?.label).toBe('English');
      expect(english?.flag).toBe('assets/images/language-en.png');
    });

    it('should have German language', () => {
      const german = component.languages.find((lang) => lang.code === 'de');

      expect(german).toBeDefined();
      expect(german?.label).toBe('Deutsch');
      expect(german?.flag).toBe('assets/images/language-de.png');
    });
  });

  describe('getCurrentLanguageData()', () => {
    it('should return English data when current language is en', () => {
      const langData = component.getCurrentLanguageData();

      expect(langData).toBeDefined();
      expect(langData?.code).toBe('en');
      expect(langData?.label).toBe('English');
      expect(langData?.flag).toBe('assets/images/language-en.png');
    });

    it('should return German data when current language is de', () => {
      (translationServiceSpy.currentLang as jasmine.Spy).and.returnValue('de');

      const langData = component.getCurrentLanguageData();

      expect(langData).toBeDefined();
      expect(langData?.code).toBe('de');
      expect(langData?.label).toBe('Deutsch');
      expect(langData?.flag).toBe('assets/images/language-de.png');
    });

    it('should return undefined for unknown language', () => {
      (translationServiceSpy.currentLang as jasmine.Spy).and.returnValue('fr');

      const langData = component.getCurrentLanguageData();

      expect(langData).toBeUndefined();
    });
  });

  describe('toggleDropdown()', () => {
    it('should open dropdown when closed', () => {
      expect(component.isDropdownOpen()).toBe(false);

      component.toggleDropdown();

      expect(component.isDropdownOpen()).toBe(true);
    });

    it('should close dropdown when open', () => {
      component.isDropdownOpen.set(true);

      component.toggleDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should toggle dropdown multiple times', () => {
      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(true);

      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(false);

      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(true);
    });
  });

  describe('closeDropdown()', () => {
    it('should close dropdown', () => {
      component.isDropdownOpen.set(true);

      component.closeDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should keep dropdown closed when already closed', () => {
      expect(component.isDropdownOpen()).toBe(false);

      component.closeDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });
  });

  describe('switchLanguage()', () => {
    it('should call translation service with English', () => {
      component.switchLanguage('en');

      expect(translationServiceSpy.use).toHaveBeenCalledWith('en');
    });

    it('should call translation service with German', () => {
      component.switchLanguage('de');

      expect(translationServiceSpy.use).toHaveBeenCalledWith('de');
    });

    it('should close dropdown after switching language', () => {
      component.isDropdownOpen.set(true);

      component.switchLanguage('de');

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should switch language and close dropdown in one action', () => {
      component.isDropdownOpen.set(true);

      component.switchLanguage('en');

      expect(translationServiceSpy.use).toHaveBeenCalledWith('en');
      expect(component.isDropdownOpen()).toBe(false);
    });
  });

  describe('handleClickOutside()', () => {
    it('should close dropdown when clicking outside', () => {
      component.isDropdownOpen.set(true);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: document.body, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should not close dropdown when clicking inside', () => {
      component.isDropdownOpen.set(true);

      const languageSwitcher = document.createElement('div');
      languageSwitcher.classList.add('language-switcher');
      document.body.appendChild(languageSwitcher);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: languageSwitcher, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(true);

      document.body.removeChild(languageSwitcher);
    });

    it('should not close dropdown when dropdown is already closed', () => {
      expect(component.isDropdownOpen()).toBe(false);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: document.body, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should handle clicks on child elements inside language-switcher', () => {
      component.isDropdownOpen.set(true);

      const languageSwitcher = document.createElement('div');
      languageSwitcher.classList.add('language-switcher');
      const childButton = document.createElement('button');
      languageSwitcher.appendChild(childButton);
      document.body.appendChild(languageSwitcher);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: childButton, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(true);

      document.body.removeChild(languageSwitcher);
    });
  });

  describe('onFocusOut()', () => {
    it('should close dropdown when focus leaves component', () => {
      component.isDropdownOpen.set(true);

      const container = document.createElement('div');
      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      const event = new FocusEvent('focusout', {
        relatedTarget: outsideElement,
      });
      Object.defineProperty(event, 'currentTarget', { value: container, writable: false });

      component.onFocusOut(event);

      expect(component.isDropdownOpen()).toBe(false);

      document.body.removeChild(outsideElement);
    });

    it('should not close dropdown when focus stays within component', () => {
      component.isDropdownOpen.set(true);

      const container = document.createElement('div');
      const childElement = document.createElement('button');
      container.appendChild(childElement);

      const event = new FocusEvent('focusout', {
        relatedTarget: childElement,
      });
      Object.defineProperty(event, 'currentTarget', { value: container, writable: false });

      component.onFocusOut(event);

      expect(component.isDropdownOpen()).toBe(true);
    });

    it('should handle focus out with null relatedTarget', () => {
      component.isDropdownOpen.set(true);

      const container = document.createElement('div');

      const event = new FocusEvent('focusout', {
        relatedTarget: null,
      });
      Object.defineProperty(event, 'currentTarget', { value: container, writable: false });

      component.onFocusOut(event);

      expect(component.isDropdownOpen()).toBe(false);
    });
  });

  describe('DOM rendering', () => {
    it('should render toggle button', () => {
      const button = fixture.nativeElement.querySelector('.language-switcher__toggle');

      expect(button).toBeTruthy();
    });

    it('should not render dropdown initially', () => {
      const dropdown = fixture.nativeElement.querySelector('.language-switcher__dropdown');

      expect(dropdown).toBeNull();
    });

    it('should render dropdown when open', () => {
      component.isDropdownOpen.set(true);
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.language-switcher__dropdown');

      expect(dropdown).toBeTruthy();
    });

    it('should render two language options when dropdown is open', () => {
      component.isDropdownOpen.set(true);
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.language-switcher__option');

      expect(options.length).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle rapid toggle clicks', () => {
      component.toggleDropdown();
      component.toggleDropdown();
      component.toggleDropdown();

      expect(component.isDropdownOpen()).toBe(true);
    });

    it('should handle multiple language switches', () => {
      component.switchLanguage('en');
      component.switchLanguage('de');
      component.switchLanguage('en');

      expect(translationServiceSpy.use).toHaveBeenCalledTimes(3);
      expect(translationServiceSpy.use).toHaveBeenCalledWith('en');
    });

    it('should maintain closed state after multiple close calls', () => {
      component.closeDropdown();
      component.closeDropdown();
      component.closeDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should handle language data with all properties', () => {
      const langData = component.getCurrentLanguageData();

      expect(langData).toEqual({
        code: 'en',
        label: 'English',
        flag: 'assets/images/language-en.png',
      });
    });
  });
});
