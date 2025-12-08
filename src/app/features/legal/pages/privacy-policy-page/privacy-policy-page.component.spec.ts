/**
 * @fileoverview Privacy policy page component tests.
 * @description Unit tests for the PrivacyPolicyPageComponent.
 * @module features/legal/pages/privacy-policy-page
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPolicyPageComponent } from './privacy-policy-page.component';

describe('PrivacyPolicyPageComponent', () => {
  let component: PrivacyPolicyPageComponent;
  let fixture: ComponentFixture<PrivacyPolicyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render privacy policy title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Privacy Policy');
  });

  it('should display last updated date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lastUpdated = compiled.querySelector('.last-updated');
    expect(lastUpdated?.textContent).toContain(component.lastUpdated);
  });

  it('should display data collection section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dataSection = compiled.querySelector('.data-collection');
    expect(dataSection).toBeTruthy();
  });

  it('should display cookies section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cookiesSection = compiled.querySelector('.cookies');
    expect(cookiesSection).toBeTruthy();
  });

  it('should display your rights section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rightsSection = compiled.querySelector('.your-rights');
    expect(rightsSection).toBeTruthy();
  });

  it('should have proper page structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.privacy-policy-page')).toBeTruthy();
    expect(compiled.querySelector('.container')).toBeTruthy();
    expect(compiled.querySelector('.page-header')).toBeTruthy();
    expect(compiled.querySelector('.privacy-content')).toBeTruthy();
  });

  it('should display overview section with proper styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const overview = compiled.querySelector('.overview');
    expect(overview).toBeTruthy();
  });

  it('should render usage grid with proper items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usageGrid = compiled.querySelector('.usage-grid');
    const usageItems = compiled.querySelectorAll('.usage-item');
    expect(usageGrid).toBeTruthy();
    expect(usageItems.length).toBeGreaterThan(0);
  });
});
