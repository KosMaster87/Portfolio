import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaButton } from './cta-button';

describe('CtaButton', () => {
  let component: CtaButton;
  let fixture: ComponentFixture<CtaButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
