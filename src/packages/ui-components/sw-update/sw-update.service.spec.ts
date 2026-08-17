import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwUpdate, UnrecoverableStateEvent, VersionReadyEvent } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { SW_UPDATE_CHECK_INTERVAL_MS } from './sw-update-config';
import { SwUpdateTranslator } from './sw-update-translator';
import { SwUpdateService } from './sw-update.service';

describe('SwUpdateService', () => {
  let versionUpdates$: Subject<VersionReadyEvent>;
  let unrecoverable$: Subject<UnrecoverableStateEvent>;
  let isStable$: Subject<boolean>;
  let swUpdateSpy: jasmine.SpyObj<SwUpdate>;
  let appRefSpy: jasmine.SpyObj<ApplicationRef>;
  let translatorSpy: jasmine.SpyObj<SwUpdateTranslator>;

  function createService(isEnabled = true): SwUpdateService {
    versionUpdates$ = new Subject<VersionReadyEvent>();
    unrecoverable$ = new Subject<UnrecoverableStateEvent>();
    isStable$ = new Subject<boolean>();

    swUpdateSpy = jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate'], {
      isEnabled,
      versionUpdates: versionUpdates$.asObservable(),
      unrecoverable: unrecoverable$.asObservable(),
    });
    swUpdateSpy.checkForUpdate.and.returnValue(Promise.resolve(false));
    swUpdateSpy.activateUpdate.and.returnValue(Promise.resolve(true));

    appRefSpy = jasmine.createSpyObj('ApplicationRef', [], {
      isStable: isStable$.asObservable(),
    });

    translatorSpy = jasmine.createSpyObj('SwUpdateTranslator', ['instant']);
    translatorSpy.instant.and.callFake((key: string) => key);

    TestBed.configureTestingModule({
      providers: [
        SwUpdateService,
        { provide: SwUpdate, useValue: swUpdateSpy },
        { provide: ApplicationRef, useValue: appRefSpy },
        { provide: SwUpdateTranslator, useValue: translatorSpy },
        { provide: SW_UPDATE_CHECK_INTERVAL_MS, useValue: 1000 },
      ],
    });

    return TestBed.inject(SwUpdateService);
  }

  it('should be created', () => {
    expect(createService()).toBeTruthy();
  });

  it('should have a hidden notification initially', () => {
    const service = createService();
    expect(service.notification()).toEqual({
      show: false,
      message: '',
      actionText: '',
      type: 'success',
      persist: false,
    });
    expect(service.updateAvailable()).toBe(false);
  });

  describe('initialize()', () => {
    it('should not check for updates when SW is disabled', () => {
      const service = createService(false);
      service.initialize();
      isStable$.next(true);
      expect(swUpdateSpy.checkForUpdate).not.toHaveBeenCalled();
    });

    it('should check for updates once the app is stable', () => {
      const service = createService();
      service.initialize();
      isStable$.next(true);
      expect(swUpdateSpy.checkForUpdate).toHaveBeenCalled();
    });

    it('should show a non-persistent success notification on VERSION_READY', () => {
      const service = createService();
      service.initialize();

      versionUpdates$.next({
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      });

      expect(service.notification()).toEqual({
        show: true,
        message: 'UPDATE.message',
        actionText: 'UPDATE.action',
        type: 'success',
        persist: false,
      });
      expect(service.updateAvailable()).toBe(true);
    });

    it('keeps updateAvailable() true after dismiss() hides the notification', () => {
      const service = createService();
      service.initialize();

      versionUpdates$.next({
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      });
      service.dismiss();

      expect(service.notification().show).toBe(false);
      expect(service.updateAvailable()).toBe(true);
    });

    it('should show a persistent error notification on unrecoverable state', () => {
      const service = createService();
      service.initialize();

      unrecoverable$.next({ type: 'UNRECOVERABLE_STATE', reason: 'missing asset' });

      expect(service.notification()).toEqual({
        show: true,
        message: 'UPDATE.unrecoverableMessage',
        actionText: 'UPDATE.reloadAction',
        type: 'error',
        persist: true,
      });
    });
  });

  describe('onAction()', () => {
    it('should activate the update and reload for a ready update', (done) => {
      const service = createService();
      // window.location.reload isn't spy-able directly in Karma's Chrome Headless -
      // reloadPage() exists precisely so tests can spy on it instead.
      const reloadSpy = spyOn(service as unknown as { reloadPage(): void }, 'reloadPage');

      service.initialize();
      versionUpdates$.next({
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      });

      service.onAction();

      setTimeout(() => {
        expect(swUpdateSpy.activateUpdate).toHaveBeenCalled();
        expect(reloadSpy).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should just reload, without activating, for an unrecoverable state', () => {
      const service = createService();
      const reloadSpy = spyOn(service as unknown as { reloadPage(): void }, 'reloadPage');

      service.initialize();
      unrecoverable$.next({ type: 'UNRECOVERABLE_STATE', reason: 'missing asset' });

      service.onAction();

      expect(swUpdateSpy.activateUpdate).not.toHaveBeenCalled();
      expect(reloadSpy).toHaveBeenCalled();
    });
  });

  describe('dismiss()', () => {
    it('should hide the notification without touching its message', () => {
      const service = createService();
      service.initialize();
      versionUpdates$.next({
        type: 'VERSION_READY',
        currentVersion: { hash: 'v1' },
        latestVersion: { hash: 'v2' },
      });

      service.dismiss();

      expect(service.notification().show).toBe(false);
      expect(service.notification().message).toBe('UPDATE.message');
    });
  });
});
