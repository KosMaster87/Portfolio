import { TestBed } from '@angular/core/testing';

import { HamburgerMenuService } from './hamburger-menu.service';

describe('HamburgerMenuService', () => {
  let service: HamburgerMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HamburgerMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
