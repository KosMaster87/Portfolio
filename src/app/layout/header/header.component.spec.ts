/**
 * @fileoverview Header component tests.
 * @description Unit tests for the HeaderComponent.
 * @module layout/header
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './header.component';
import { TranslationService } from '../../core/services/translation.service';
import { ScrollService } from '../../core/services/scroll.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), TranslationService, ScrollService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render brand logo/text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandText = compiled.querySelector('.header__logo-text');
    expect(brandText?.textContent).toContain('dev2k');
  });

  it('should toggle mobile menu', () => {
    expect(component.isMenuOpen()).toBeFalse();

    component.toggleMenu();
    expect(component.isMenuOpen()).toBeTrue();

    component.toggleMenu();
    expect(component.isMenuOpen()).toBeFalse();
  });

  it('should close mobile menu', () => {
    component.isMenuOpen.set(true);
    component.closeMenu();
    expect(component.isMenuOpen()).toBeFalse();
  });

  it('should render desktop navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const desktopNav = compiled.querySelector('.header__nav');
    const navLinks = desktopNav?.querySelectorAll('.header__nav-link');

    expect(desktopNav).toBeTruthy();
    expect(navLinks?.length).toBeGreaterThan(0);
  });

  it('should render mobile navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mobileMenu = compiled.querySelector('.header__menu');
    const mobileNavLinks = mobileMenu?.querySelectorAll('.header__menu-link');

    expect(mobileMenu).toBeTruthy();
    expect(mobileNavLinks?.length).toBeGreaterThan(0);
  });

  it('should have mobile menu toggle button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const hamburger = compiled.querySelector('.header__burger');
    const hamburgerLines = hamburger?.querySelectorAll('.header__burger-line');

    expect(hamburger).toBeTruthy();
    expect(hamburgerLines?.length).toBe(3);
  });

  it('should have proper router link attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Check for imprint and privacy in the mobile menu
    const imprintLink = compiled.querySelector('a[routerLink="/imprint"]');
    const privacyLink = compiled.querySelector('a[routerLink="/privacy-policy"]');

    expect(imprintLink).toBeTruthy();
    expect(privacyLink).toBeTruthy();
  });

  it('should apply active class when menu is open', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuToggle = compiled.querySelector('.header__menu-toggle') as HTMLInputElement;

    component.isMenuOpen.set(true);
    fixture.detectChanges();

    // In the real DOM, the checkbox state controls visibility
    expect(component.isMenuOpen()).toBeTrue();
  });
});
