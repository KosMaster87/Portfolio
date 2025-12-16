import { TestBed } from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { SwUpdateService } from './sw-update.service';
import { TranslationService } from './translation.service';

describe('SwUpdateService', () => {
  let service: SwUpdateService;
  let swUpdateSpy: jasmine.SpyObj<SwUpdate>;
  let appRefSpy: jasmine.SpyObj<ApplicationRef>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let versionUpdatesSubject: Subject<VersionReadyEvent>;
  let isStableSubject: Subject<boolean>;

  beforeEach(() => {
    versionUpdatesSubject = new Subject<VersionReadyEvent>();
    isStableSubject = new Subject<boolean>();

    swUpdateSpy = jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate'], {
      isEnabled: true,
      versionUpdates: versionUpdatesSubject.asObservable(),
    });
    swUpdateSpy.checkForUpdate.and.returnValue(Promise.resolve(false));
    swUpdateSpy.activateUpdate.and.returnValue(Promise.resolve(true));

    appRefSpy = jasmine.createSpyObj('ApplicationRef', [], {
      isStable: isStableSubject.asObservable(),
    });

    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant']);
    translationServiceSpy.instant.and.returnValue('New version available');

    TestBed.configureTestingModule({
      providers: [
        SwUpdateService,
        { provide: SwUpdate, useValue: swUpdateSpy },
        { provide: ApplicationRef, useValue: appRefSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    service = TestBed.inject(SwUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Signals', () => {
    it('should have showUpdateNotification signal initially false', () => {
      expect(service.showUpdateNotification()).toBe(false);
    });

    it('should have updateMessage signal initially empty', () => {
      expect(service.updateMessage()).toBe('');
    });
  });

  describe('initialize()', () => {
    it('should not check for updates when SW is disabled', () => {
      const disabledSpy = jasmine.createSpyObj('SwUpdate', ['checkForUpdate'], {
        isEnabled: false,
        versionUpdates: versionUpdatesSubject.asObservable(),
      });

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          SwUpdateService,
          { provide: SwUpdate, useValue: disabledSpy },
          { provide: ApplicationRef, useValue: appRefSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      const disabledService = TestBed.inject(SwUpdateService);
      disabledService.initialize();
      isStableSubject.next(true);

      expect(disabledSpy.checkForUpdate).not.toHaveBeenCalled();
    });

    it('should check for updates when app is stable', (done) => {
      service.initialize();

      isStableSubject.next(true);

      setTimeout(() => {
        expect(swUpdateSpy.checkForUpdate).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should show notification on VERSION_READY event', () => {
      service.initialize();

      const versionEvent: VersionReadyEvent = {
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      };

      versionUpdatesSubject.next(versionEvent);

      expect(service.showUpdateNotification()).toBe(true);
    });

    it('should set update message from translation', () => {
      service.initialize();

      const versionEvent: VersionReadyEvent = {
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      };

      versionUpdatesSubject.next(versionEvent);

      expect(service.updateMessage()).toBe('New version available');
    });
  });

  describe('dismissUpdate()', () => {
    it('should set showUpdateNotification to false', () => {
      service.initialize();

      const versionEvent: VersionReadyEvent = {
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      };

      versionUpdatesSubject.next(versionEvent);
      expect(service.showUpdateNotification()).toBe(true);

      service.dismissUpdate();

      expect(service.showUpdateNotification()).toBe(false);
    });

    it('should not change updateMessage', () => {
      service.initialize();

      const versionEvent: VersionReadyEvent = {
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      };

      versionUpdatesSubject.next(versionEvent);
      const messageBefore = service.updateMessage();

      service.dismissUpdate();

      expect(service.updateMessage()).toBe(messageBefore);
    });
  });
});
