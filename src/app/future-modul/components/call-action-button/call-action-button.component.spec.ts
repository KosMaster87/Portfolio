import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallActionButtonComponent } from './call-action-button.component';

describe('CallActionButtonComponent', () => {
  let component: CallActionButtonComponent;
  let fixture: ComponentFixture<CallActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallActionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
