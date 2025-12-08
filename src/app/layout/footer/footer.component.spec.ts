/**
 * @fileoverview Footer component tests.
 * @description Unit tests for the FooterComponent.
 * @module layout/footer
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(currentYear.toString());
  });

  it('should render brand title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandTitle = compiled.querySelector('.brand-title');
    expect(brandTitle?.textContent).toContain('Portfolio');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.footer-nav-link');
    expect(navLinks.length).toBeGreaterThan(0);

    // Check for specific navigation links
    const homeLink = compiled.querySelector('a[routerLink="/"]');
    const aboutLink = compiled.querySelector('a[routerLink="/about"]');
    expect(homeLink).toBeTruthy();
    expect(aboutLink).toBeTruthy();
  });

  it('should render legal links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imprintLink = compiled.querySelector('a[routerLink="/imprint"]');
    const privacyLink = compiled.querySelector('a[routerLink="/privacy-policy"]');
    expect(imprintLink).toBeTruthy();
    expect(privacyLink).toBeTruthy();
  });

  it('should render social media links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialLinks = compiled.querySelectorAll('.social-link');
    expect(socialLinks.length).toBe(component.socialLinks.length);

    // Check if social links have proper attributes
    socialLinks.forEach((link, index) => {
      expect(link.getAttribute('href')).toBe(component.socialLinks[index].url);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('should have back to top button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const backToTopBtn = compiled.querySelector('.back-to-top-btn');
    expect(backToTopBtn).toBeTruthy();
  });

  it('should call scrollToTop when back to top button is clicked', () => {
    spyOn(component, 'scrollToTop');
    const compiled = fixture.nativeElement as HTMLElement;
    const backToTopBtn = compiled.querySelector('.back-to-top-btn') as HTMLButtonElement;

    backToTopBtn.click();
    expect(component.scrollToTop).toHaveBeenCalled();
  });

  it('should return Angular version', () => {
    const version = component.getAngularVersion();
    expect(version).toBeTruthy();
    expect(typeof version).toBe('string');
  });

  it('should call window.scrollTo when scrollToTop is called', () => {
    const scrollToSpy = spyOn(window, 'scrollTo').and.stub();
    component.scrollToTop();
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('should have proper footer structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-footer')).toBeTruthy();
    expect(compiled.querySelector('.footer-content')).toBeTruthy();
    expect(compiled.querySelector('.footer-bottom')).toBeTruthy();
    expect(compiled.querySelector('.footer-brand')).toBeTruthy();
    expect(compiled.querySelector('.footer-navigation')).toBeTruthy();
    expect(compiled.querySelector('.footer-legal')).toBeTruthy();
    expect(compiled.querySelector('.footer-social')).toBeTruthy();
  });

  it('should display tech stack information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const techInfo = compiled.querySelector('.tech-info');
    expect(techInfo).toBeTruthy();
    expect(techInfo?.textContent).toContain('Angular');
    expect(techInfo?.textContent).toContain('TypeScript');
  });
});
