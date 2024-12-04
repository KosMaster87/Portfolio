import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonContactComponent } from './button-contact.component';

describe('ButtonContactComponent', () => {
  let component: ButtonContactComponent;
  let fixture: ComponentFixture<ButtonContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
