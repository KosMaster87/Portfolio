/**
 * @fileoverview Not found page component tests.
 * @description Unit tests for the NotFoundPageComponent.
 * @module shared/pages/not-found-page
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPageComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 error number', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const errorNumber = compiled.querySelector('.error-number');
    expect(errorNumber?.textContent).toContain('404');
  });

  it('should render page not found title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Page Not Found');
  });

  it('should display home button link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a[routerLink="/"]');
    expect(homeLink).toBeTruthy();
    expect(homeLink?.textContent).toContain('Back to Home');
  });

  it('should display helpful quick links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const quickLinks = compiled.querySelectorAll('.quick-link');
    expect(quickLinks.length).toBeGreaterThan(0);
  });

  it('should have proper page structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.not-found-page')).toBeTruthy();
    expect(compiled.querySelector('.container')).toBeTruthy();
    expect(compiled.querySelector('.not-found-content')).toBeTruthy();
    expect(compiled.querySelector('.error-visual')).toBeTruthy();
  });

  it('should display fun fact message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const funMessage = compiled.querySelector('.fun-message');
    expect(funMessage).toBeTruthy();
    expect(funMessage?.textContent).toContain('Fun fact');
  });

  it('should render error actions section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const errorActions = compiled.querySelector('.error-actions');
    const buttons = errorActions?.querySelectorAll('.btn');
    expect(errorActions).toBeTruthy();
    expect(buttons?.length).toBeGreaterThanOrEqual(2);
  });

  it('should have proper button classes and styles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const primaryBtn = compiled.querySelector('.btn-primary');
    const secondaryBtn = compiled.querySelector('.btn-secondary');
    expect(primaryBtn).toBeTruthy();
    expect(secondaryBtn).toBeTruthy();
  });
});
