import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    expect(component.isDropdownOpen()).toBe(false);
    component.toggleDropdown();
    expect(component.isDropdownOpen()).toBe(true);
    component.toggleDropdown();
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should close dropdown', () => {
    component.isDropdownOpen.set(true);
    component.closeDropdown();
    expect(component.isDropdownOpen()).toBe(false);
  });
});
