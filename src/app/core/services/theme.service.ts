/**
 * @fileoverview Theme Service for Dark/Light mode management
 * @description Manages theme state with localStorage persistence
 * @module core/services
 * @note This service is provided at root level and lives for the entire app lifecycle.
 * Event listeners are intentionally not cleaned up as the service persists throughout the application.
 */

import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly currentTheme = signal<Theme>(this.getInitialTheme());
  readonly activeTheme = signal<ResolvedTheme>('light');

  constructor() {
    this.setupThemeEffect();
    this.setupManifestEffect();
    this.watchSystemThemeChanges();
  }

  /**
   * Set the theme
   * @param theme - Theme to set (light, dark, or auto)
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  /**
   * Toggle between light and dark mode
   */
  toggleTheme(): void {
    const newTheme = this.activeTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Setup effect for theme changes
   */
  private setupThemeEffect(): void {
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
      this.saveThemeToStorage(theme);
    });
  }

  /**
   * Setup effect for manifest and favicon updates
   */
  private setupManifestEffect(): void {
    effect(() => {
      const theme = this.activeTheme();
      this.updateManifest(theme);
      this.updateFavicon(theme);
    });
  }

  /**
   * Get initial theme from storage or default to 'auto'
   * @returns Initial theme from localStorage or 'auto'
   */
  private getInitialTheme(): Theme {
    if (typeof localStorage === 'undefined') return 'auto';
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return this.isValidTheme(stored) ? stored : 'auto';
  }

  /**
   * Validate if string is a valid theme
   * @param value - String value to validate
   * @returns Type predicate indicating if value is a valid Theme
   */
  private isValidTheme(value: string | null): value is Theme {
    return value === 'light' || value === 'dark' || value === 'auto';
  }

  /**
   * Apply theme to the document
   * @param theme - Theme to apply
   */
  private applyTheme(theme: Theme): void {
    const resolved = this.resolveTheme(theme);
    this.activeTheme.set(resolved);
    this.applyThemeToDOM(resolved);
    this.updateMetaThemeColor(resolved);
  }

  /**
   * Resolve theme (convert 'auto' to actual theme)
   * @param theme - Theme to resolve
   * @returns Resolved theme (light or dark)
   */
  private resolveTheme(theme: Theme): ResolvedTheme {
    return theme === 'auto' ? this.getSystemTheme() : theme;
  }

  /**
   * Apply theme attribute to DOM
   * @param theme - Resolved theme to apply
   */
  private applyThemeToDOM(theme: ResolvedTheme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Get system color scheme preference
   * @returns System theme (light or dark)
   */
  private getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined' || !window.matchMedia) return 'light';
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  }

  /**
   * Watch for system theme changes
   */
  private watchSystemThemeChanges(): void {
    if (!this.hasMediaQuerySupport()) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', this.handleSystemThemeChange);
  }

  /**
   * Check if media query is supported
   * @returns True if media query is supported
   */
  private hasMediaQuerySupport(): boolean {
    return typeof window !== 'undefined' && !!window.matchMedia;
  }

  /**
   * Handle system theme change event
   */
  private handleSystemThemeChange = (): void => {
    if (this.currentTheme() === 'auto') {
      this.applyTheme('auto');
    }
  };

  /**
   * Save theme preference to localStorage
   * @param theme - Theme to save
   */
  private saveThemeToStorage(theme: Theme): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  /**
   * Update meta theme-color for mobile browsers
   * @param theme - Theme for color selection
   */
  private updateMetaThemeColor(theme: ResolvedTheme): void {
    const meta = this.getMetaThemeColorElement();
    if (!meta) return;
    const color = this.getThemeColor(theme);
    meta.setAttribute('content', color);
  }

  /**
   * Get meta theme-color element
   * @returns Meta theme-color element or null
   */
  private getMetaThemeColorElement(): Element | null {
    return document.querySelector('meta[name="theme-color"]');
  }

  /**
   * Get color value for theme
   * @param theme - Theme to get color for
   * @returns Hex color code
   */
  private getThemeColor(theme: ResolvedTheme): string {
    return theme === 'dark' ? '#1a1a1a' : '#fffcf3';
  }

  /**
   * Update PWA manifest based on theme
   * @param theme - Theme for manifest selection
   */
  private updateManifest(theme: ResolvedTheme): void {
    if (typeof document === 'undefined') return;
    const link = this.getManifestLink();
    if (!link) return;
    const path = this.getManifestPath(theme);
    link.setAttribute('href', path);
  }

  /**
   * Get manifest link element
   * @returns Manifest link element or null
   */
  private getManifestLink(): HTMLLinkElement | null {
    return document.querySelector('link[rel="manifest"]');
  }

  /**
   * Get manifest path for theme
   * @param theme - Theme for path generation
   * @returns Manifest file path
   */
  private getManifestPath(theme: ResolvedTheme): string {
    return `/manifest-${theme}.webmanifest`;
  }

  /**
   * Update favicon based on theme
   * @param theme - Theme for favicon selection
   */
  private updateFavicon(theme: ResolvedTheme): void {
    if (typeof document === 'undefined') return;
    const links = this.getFaviconLinks();
    links.forEach((link) => this.updateFaviconLink(link, theme));
  }

  /**
   * Get all favicon link elements
   * @returns Array of favicon link elements
   */
  private getFaviconLinks(): HTMLLinkElement[] {
    const links = document.querySelectorAll('link[rel*="icon"]');
    return Array.from(links) as HTMLLinkElement[];
  }

  /**
   * Update single favicon link
   * @param link - Favicon link element to update
   * @param theme - Theme for path generation
   */
  private updateFaviconLink(link: HTMLLinkElement, theme: ResolvedTheme): void {
    const href = link.getAttribute('href');
    if (!href) return;
    const filename = this.extractFilename(href);
    const newPath = this.getFaviconPath(theme, filename);
    link.setAttribute('href', newPath);
  }

  /**
   * Extract filename from path
   * @param path - File path to extract from
   * @returns Extracted filename
   */
  private extractFilename(path: string): string {
    return path.split('/').pop() || '';
  }

  /**
   * Get favicon path for theme
   * @param theme - Theme for path generation
   * @param filename - Favicon filename
   * @returns Complete favicon path
   */
  private getFaviconPath(theme: ResolvedTheme, filename: string): string {
    return `/theme-${theme}/${filename}`;
  }
}
