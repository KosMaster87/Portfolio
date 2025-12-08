/**
 * @fileoverview Imprint page component tests.
 * @description Unit tests for the ImprintPageComponent.
 * @module features/legal/pages/imprint-page
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImprintPageComponent } from './imprint-page.component';

describe('ImprintPageComponent', () => {
  let component: ImprintPageComponent;
  let fixture: ComponentFixture<ImprintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render imprint title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Impressum');
  });

  it('should display contact information section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contactSection = compiled.querySelector('.contact-info');
    expect(contactSection).toBeTruthy();
  });

  it('should display legal information section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const legalSection = compiled.querySelector('.legal-info');
    expect(legalSection).toBeTruthy();
  });

  it('should have proper page structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.imprint-page')).toBeTruthy();
    expect(compiled.querySelector('.container')).toBeTruthy();
    expect(compiled.querySelector('.page-header')).toBeTruthy();
    expect(compiled.querySelector('.imprint-content')).toBeTruthy();
  });
});
