import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherComponent);
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
