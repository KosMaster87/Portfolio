/**
 * @fileoverview SEO Service for meta tags management
 * @description Dynamically update page metadata for better SEO
 * @module core/services
 */

import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /**
   * Update page metadata for SEO
   * @param metadata - Page metadata configuration
   */
  updateMetadata(metadata: PageMetadata): void {
    if (metadata.title) {
      this.titleService.setTitle(metadata.title);
    }

    if (metadata.description) {
      this.metaService.updateTag({ name: 'description', content: metadata.description });
    }

    if (metadata.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: metadata.keywords });
    }

    // Open Graph tags
    if (metadata.ogTitle) {
      this.metaService.updateTag({ property: 'og:title', content: metadata.ogTitle });
    }

    if (metadata.ogDescription) {
      this.metaService.updateTag({ property: 'og:description', content: metadata.ogDescription });
    }

    if (metadata.ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: metadata.ogImage });
    }

    if (metadata.ogUrl) {
      this.metaService.updateTag({ property: 'og:url', content: metadata.ogUrl });
    }
  }

  /**
   * Reset metadata to default values
   */
  resetMetadata(): void {
    this.updateMetadata({
      title: 'Portfolio - Software Developer',
      description: 'Professional portfolio showcasing modern web development projects and skills',
      keywords: 'portfolio, software developer, web development, Angular, TypeScript',
    });
  }
}
