import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerMenuBtnComponent } from './hamburger-menu-btn.component';

describe('HamburgerMenuBtnComponent', () => {
  let component: HamburgerMenuBtnComponent;
  let fixture: ComponentFixture<HamburgerMenuBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerMenuBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerMenuBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
