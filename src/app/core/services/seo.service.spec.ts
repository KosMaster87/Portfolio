/**
 * @fileoverview Unit tests for SEO Service
 * @description Tests for meta tags management functionality
 */

import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: jasmine.SpyObj<Title>;
  let metaService: jasmine.SpyObj<Meta>;

  beforeEach(() => {
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
      ],
    });

    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    metaService = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateMetadata()', () => {
    it('should update page title when title is provided', () => {
      const metadata = { title: 'Test Page Title' };

      service.updateMetadata(metadata);

      expect(titleService.setTitle).toHaveBeenCalledWith('Test Page Title');
      expect(titleService.setTitle).toHaveBeenCalledTimes(1);
    });

    it('should NOT update page title when title is undefined', () => {
      const metadata = { description: 'Only description' };

      service.updateMetadata(metadata);

      expect(titleService.setTitle).not.toHaveBeenCalled();
    });

    it('should update description meta tag when description is provided', () => {
      const metadata = { description: 'Test description' };

      service.updateMetadata(metadata);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Test description',
      });
    });

    it('should update keywords meta tag when keywords are provided', () => {
      const metadata = { keywords: 'angular, typescript, testing' };

      service.updateMetadata(metadata);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'keywords',
        content: 'angular, typescript, testing',
      });
    });

    it('should update Open Graph title when ogTitle is provided', () => {
      const metadata = { ogTitle: 'OG Title' };

      service.updateMetadata(metadata);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: 'OG Title',
      });
    });

    it('should update Open Graph description when ogDescription is provided', () => {
      const metadata = { ogDescription: 'OG Description' };

      service.updateMetadata(metadata);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: 'OG Description',
      });
    });

    it('should update Open Graph image when ogImage is provided', () => {
      const metadata = { ogImage: 'https://example.com/image.png' };

      service.updateMetadata(metadata);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:image',
        content: 'https://example.com/image.png',
      });
    });

    it('should update Open Graph URL when ogUrl is provided', () => {
      const metadata = { ogUrl: 'https://example.com' };

      service.updateMetadata(metadata);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:url',
        content: 'https://example.com',
      });
    });

    it('should update multiple meta tags when all metadata is provided', () => {
      const metadata = {
        title: 'Full Page Title',
        description: 'Full description',
        keywords: 'test, keywords',
        ogTitle: 'OG Title',
        ogDescription: 'OG Desc',
        ogImage: 'https://example.com/og.png',
        ogUrl: 'https://example.com',
      };

      service.updateMetadata(metadata);

      expect(titleService.setTitle).toHaveBeenCalledWith('Full Page Title');
      expect(metaService.updateTag).toHaveBeenCalledTimes(6);
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Full description',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'keywords',
        content: 'test, keywords',
      });
    });
  });

  describe('resetMetadata()', () => {
    it('should reset metadata to default values', () => {
      service.resetMetadata();

      expect(titleService.setTitle).toHaveBeenCalledWith('Portfolio - Software Developer');
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Professional portfolio showcasing modern web development projects and skills',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'keywords',
        content: 'portfolio, software developer, web development, Angular, TypeScript',
      });
    });
  });
});
